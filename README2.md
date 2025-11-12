# Techs Used(Fullstack):

- Next JS
- TS to catch bugs.
- Clerk Library for authentication.
- Shadcn UI to create interfaces.
- SupaBase to store our Data on a cloud(Managed PostgreSQL database).
- Prizma as the database toolkit
- Stripe to accept payments

3 types of users
Public User
Authenticated User
Admin User - create products

---

# Projects steps

1- installing dependacies
2- creating pages
3- creating components folders inside components next to UI which (UI) has the shadcn components
4- installing/adding components
5- Create the container - Use CN function that takes arguments and filter out the falsy value.
6- Create the NavBar and add the elements
7- Pick the 2 themes and system mode from the UI
8- Set Provider.tsx (Component have all global providers). We use many server components, so to add Providers like Query/Redux/Theme/Toast... We need 1 component to serve as a global Provider and will wrap all the app with it.
9- Create file for Theme provider
10- Imported Theme provider into Providers file and wrapped children with it.
11- Set the theme functionallity using code from shadcn
12- implement the dropdown with links
13- Set up supabase and Prizma. Add password to .env. Prisma talks to Supabase because Prisma supports PostgreSQL extremely well

---

    Next steps:
        1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
        2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
        3. Run prisma db pull to turn your database schema into a Prisma schema.
        4. Run prisma generate to generate the Prisma Client. You can then start querying
        your database.
        5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

## NOTE:

We don't want to create new instance every time we run server. Prisma provides a code in their Docs, that check for an existing instance.
How!?

- Go to their Docs; (Prisma Instance)[https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution]
- Type either or:
  import { PrismaClient } from "@prisma/client";
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  export const prisma = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
  ***
  import { PrismaClient } from '@prisma/client';
  const prismaClientSingleton = () => {
  return new PrismaClient();
  };
  type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;
  const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
  };
  const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
  export default prisma;
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

In development only (not production), it saves that instance on globalThis:
Why?

In Next.js dev mode, files can be executed multiple times due to hot reload.
If you created a new PrismaClient each time, you’d leak connections.
This pattern keeps one shared Prisma client (a “singleton”) across reloads, preventing “too many connections” errors.

---

14- Connect supbase to prisma (coming from supabase docs)

- Get from the website the transaction string. - Add it then add the password. - Then add "?pgbouncer=true&connection_limit=1" after port6543/postgres. - Get session url from website
  15- go to schema
  ADD:
  datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
  }
  15- Push changes to prisma - npx prisma migrate dev --name init - npx prisma db push

# NOTE2: Setting CRUD operations with Prizma

    - create single record
    const task = await prisma.task.create({
        data: {
            content: 'some task',
        }
    })

    - Get All Records

    ```js
    const tasks = await prisma.task.findMany();
    ```
    - Get record by ID or unique identifier

    ```js
    // By unique identifier
    const user = await prisma.user.findUnique({
     where: {
      email: 'elsa@prisma.io',
     },
    });

    // By ID
    const task = await prisma.task.findUnique({
     where: {
        id: id,
    },
    });

    - Update Record

    const updateTask = await prisma.task.update({
    where: {
        id: id,
    },
    data: {
        content: 'updated task',
    },
    });

    - Update or create records

    const upsertTask = await prisma.task.upsert({
    where: {
        id: id,
    },
    update: {
        content: 'some value',
    },
    create: {
        content: 'some value',
    },
    });
    ```

    - Delete a single record

    ```js
    const deleteTask = await prisma.task.delete({
    where: {
        id: id,
    },
    });
    ```

16- Turn the page you use Prisma in into async. Because we will communicate with database evertime and queries are async (await/promise) IF NEEDED!!

17- Now create the actual MODEL. First one is Product.

```prisma

model Product {
  id           String     @id @default(uuid())
  name        String
  company     String
  description String
  featured   Boolean
  image       String
  price       Int
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  clerkId  String
}

```

- stop server

```bash
npx prisma db push
npx prisma studio
npm run dev
```

18- Seed File: This is just to see DB progremmatically
1- create prisma/products.json

    2- create prisma/seed.js

```js
const { PrismaClient } = require("@prisma/client");
const products = require("./products.json");
const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

```sh
node prisma/seed
```

19- Create More Components

- global

  - EmptyList
  - SectionTitle
  - LoadingContainer

- home

  - FeaturedProducts
  - Hero
  - HeroCarousel

- products
  - FavoriteToggleButton
  - FavoriteToggleForm
  - ProductsContainer
  - ProductsGrid
  - ProductsList
    20- set queries in action file
    (We wanna fetch product where featured flag is true, and then all products)
  - Create actions.ts

20- Set up Featured Products component
21- Add to Home page
22- add the format price function

- utils/format.ts

```ts
export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
```

23- Setup the FavoriteToggleButton component
24- Setup ProductsGrid component.
25- Setup Hero component and (Carousel)
26- SetUp (About Page)
27- Setup Suspense component inside the HomePage and add Loading component.

```ts
28- SetUp ProductsPage and adding to its props: {
searchParams,
}: {
searchParams: { layout?: string; search?: string };
}
```

This searchParams object will provide us with the query params and in this project we need the layout to set the list/grid accordingly and also the search value, and then they are passed to ProductsContainer

29- Setup ProductsContainer
30- SetUp ProductsList
31- SetUp NavSearch Component - needs to be run with a delay(We don't wanna make a request each time user types something) - wait like 300 ms and go ahead

For that we need external lib

- install use-debounce

```sh
npm i use-debounce
```

- So NavSearch is taking query params, and if NavSearch doesn't have a value then it removed search key from the query otherwise adds the new value to search key.
- Set state value to empty if we don't have value in search params
- Go back to Products Page to add the search value into the parameters of the function that fetches from the DB, so we can tell our server to search using either name or company and to bear in mind that case is insensetive.

32- Wrap NavSearch with Suspense
The reason, is because during dev. Next renders all pages dynamically (Every time we visit the page; About). It's going to be generated from scratch.

When we deploy. The About Page will be static. And since we have NavBar displayed in the About page as well.
If we don't wrap NavSearch in Suspense this will force our SSR page to be CSR.

We won't be able to deploy the project.

33- SetUp SingleProduct Page
34- create function for 1 product fetching from DB
35- create SingleProduct components; AddToCart,BreadCrumb, ProductRating, and set each of them.
36- Go to SSR component page, SingleProduct which has this path of @/app/products/[id]/page, and right away there is access to the params to have the id and use it to fetch that single product by invoking the fetchSingleProduct method coming from @/lib/utils/actions.ts

37- Deploy on vercel (Best Experience)

- Push the project to Git repo
- Update package.json
  "build": "npx prisma generate && next build",

38- SetUp Toaster component and add it to the Global Provider.
39- Clerk Authentication.

- create app.
- npm install clerk/nextjs.
- add to .env.local
  NOTE: variables in NEXT_PUBLIC.. are avail on frontend
- Wrap the entire app "NOT PROVIDER FILE" it's "layout.tsx" with clerk provider
- Setup middleware file in the root and add the code from clerk's docs:
  Public ones here: home,products,products/singleproduct,about

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher(["/", "/products(.*)", "/about"]);
// Here we identified the public routes (The ones that doesn't need authentication)
export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) {
    auth().protect();
  }
});
// We export the middleware function that will check if the route isn't public and then apply protection to it.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

40- SetUp SignOutLink Component.
41- SetUp UserIcon.

```ts
import { currentUser } from "@/clerk/nextjs/server";
```

42- Complete LinksDropdown
43- Admin pages

```ts
export const links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/cart", label: "cart" },
  { href: "/orders", label: "orders" },
  // We added this
  { href: "/admin/sales", label: "dashboard" },
];
// And that
export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "my products" },
  { href: "/admin/products/create", label: "create products" },
];
```

- remove existing page.tsx

- admin
  - products
    - [id]/edit/page.tsx
    - create/page.tsx
    - page.tsx
  - sales/page.tsx
  - layout.tsx
  - Sidebar.tsx

44- SetUp Sidebar.tsx
45- SetUp the shared layout aka layout.tsx.
46- Resteric Access to Admin pages.

- Only Admin user can access.
- First thing we need is userID

47- Create Product Functionallity - Admin
48- Install Faker Library:

```sh
npm install @faker-js/faker --save-dev
```

49- SetUp FormInput component.
[Docs](https://fakerjs.dev/guide/)

50- SetUp the Form components:

- components/form
  - Buttons
  - CheckBoxInput
  - FormContainer
  - FormInput
  - ImageInput
  - ImageInputContainer
  - PriceInput
  - TextAreaInput

51- createProductAction Functionallity.

- lots of code code just to access input values
- no validation (only html one)

52- Zod - We want to be more specific about input details. use functions that are reliable.
Zod is a JavaScript library for building schemas and validating data, providing type safety and error handling.

```sh
npm install zod
```

- Create validation schema file.
- Create the schema, and in the same file we can implement validation methods and export all that.
- validate the image.
- Upload image on supabase:
  1st: Go to the website: https://supabase.com/dashboard/project/vxzxjnxougyyecntbgwa/storage/files
  2nd create a storage bucket - set it to be public and enable the policy for insertion.
  set env variables
  SUPABASE_URL and SUPABASE_KEY
- SetUp Supabase

```sh
npm install @supabase/supabase-js
```

- provide method to upload to supabase
- create utils/supabase.ts
- add the bucket name to create instance - provide 2 env vars and they can be undefined.
- Create a single supabase client for interacting with your database
- Set the upload Image function
- Using time stamp and image name to set the name of this image name.
- check if no file throw an error
- if there is, then we upload to supabase.

```ts
import { createClient } from "@supabase/supabase-js";

// add the bucket name to create instance.
const bucket = "main-bucket";
// Create a single supabase client for interacting with your database
// provide 2 env vars and be aware, they can be undefined.
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
// Set the upload Image function
export const uploadImage = async (image: File) => {
  const timeStamp = Date.now();
  // Using time stamp and image name to set the name of this image name
  const newName = `${timeStamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("Image upload failed");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
```

- Then add the url to remote domain list in next.config.mjs

53- Fetching Admin Data - My Products Page.
54- SetUp the actions column.
We set up icon button. We will store form container to communicate with DB. We need submit btn but a small one.
55- Setup deleteProduct function in actions.ts
56- complete AdminProducts
57- Remove Old image from Supabase

- When deleting item, the image on supabase stays, so we need to delete it.

58- Edit Product:

- Setup fetchAdminProductDetails
- Setup updateProductAction
- Setup the page
- SetUp Image container

59- SetUp LoadingTable component in components/global.
60- SetUp the loading in the products page and import LoadingTable.

61- SetUp Favorite Model

- Start by setting the Model with Prisma.
- We need to set a relation (1 to many).
- A product can have a multiple favorite.
- When we create the favorite instance it will be with 1 product only.
- Only Logged in users can add or remove from Favorites.
- A botton to be displayed if the item is already in the favorites.

```prisma
model Product {
favorites Favorite[]
}

model Favorite {
id        String   @id @default(uuid())
clerkId  String
product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
productId String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}
```

```sh
npx prisma db push
```

62- SetUp Favorite page.
63- Share Functionality - React Share Library

- Project need to be deployed.
- Grab production URL. Add it to env.
- Create component in single-product components page.
- Display it in the single product page
- Then finish the ShareButton.tsx

64- Review Functionallity.
65- In singleproduct we need to be able to leave a review.

- We will complete product raiting component that was hardcoded.
- We will restric access to submit review button by checking if the user has a review or didn't log in.
- I need to access the name and image to add them next to their review.
- Go to components/reviews, and create:

  - RatingInput.tsx
  - Comment.tsx
  - ProductReviews.tsx
  - Rating.tsx
  - ReviewCard.tsx
  - SubmitReview.tsx

- Create SubmitReview where we have toggle functionality.
- ProductReviews - Fetching all reviews and display card for each review with img,name,rating,comment.
- Add the reviews cards into the SingleProduct.
- Add the dynamic rating to SingleProduct.

66- SetUp the Reviews Page.

- Start by setting the fetchProductReviewsByUser action.
- Create Reviews Page
- Fetch User Reviews and Delete Review Action
- Resterict Submit Button for user who already left a review. Or, user who hasn't logged in.

67- SetUp Cart and CartItem Models:

```prisma
model Product{
cartItems CartItem[]
}
model Cart {
  id        String   @id @default(uuid())
  clerkId  String
  cartItems CartItem[]
  numItemsInCart Int @default(0)
  cartTotal Int @default(0)
  shipping Int @default(5)
  tax Int @default(0)
  taxRate Float @default(0.1)
  orderTotal Int @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CartItem {
  id        String   @id @default(uuid())
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
  cart     Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  cartId   String
  amount  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- cartItem is connected to product as admin can update the product. Always wanna display latest value. Also connected to a cart. So when Admin changes something, it will be updated in the usercart
- Start with fetchCartItems.
- Display number of items

67 - Select Product Amount Component, and a product sign in button, so only the signed in user can see the button.

- Start with creating ProductSignInButtong in Buttons.tsx.
- Only logged in user can add to cart
- In the SelectProductAmount, we are using 2 different types + an enum with 2 modes so our component to be rendered in 2 different locations and using those will result in rendering the component conditionally and with half the amount of code expected using TS logic.
- SetUp addToCartButton and strict access.
- SetUp addToCart action.

68- SetUp Cart Page

# Supbase Bug:

Some students have reported that their Supabase connection works locally, but once the project is deployed on Vercel, they encounter an error.
If you experience the same issue, please continue with the lectures, as I provide a solution at the end of the project

##### I.M.P

How our Pages are being rendered andy why:
1- Home Page is SSR to optimze SEO and meet the metrics.
2- About page is SSR .....
3- We Have a Global Provider component which is set to CSR because we have "ThemeProvider coming from next-themes" which relies on browser APIs like; matchMedia, loacalStorage and React Hooks. That library must run on the client side.
4- For loading.tsx -- loading.tsx is a React component that runs immediately in the browser while the server component is still fetching / rendering.
5- In client component we use useSearchParams hook. In SSR we use {searchParams} right away as a prop.
6- We switched to CSR for the NavSearch component because we need React Hoos and other APIs.
7- SignOutLink component will be CSR because it uses browser API and Web Hooks.
8- Pages without any requests were static which means Next doesn't build them everytime we go there but after we added clerk auth all the pages became dynamic.
9- Sidebar Component is CSR because we need to invoke the usePathname hook
10- Inside a server page, if some components from shadcn or so where added into the return and an action need to take place in the form then the action function should be exposed as use server, so Next JS can handle it otherwise a nice error will be logged.
11- FormContainer to be reused in multiple places where we will communicate with DB, and since we want better user experience, this will be rendered on the Client Side.
12- A general rule for form components that are coming from shadcn. If the component uses browser hooks or API then it should run on the Client side to be more interavtive with user.
13- Another rule. if a function in actions.ts is going to call action function from a client component, then again we need to expose the function as "use server"

```ts
export async function action(prevState: any, formData: FormData) {
  // prisma stuff
}
```

14- Accessing properties from prisma

```ts
import { Prisma } from "@/prisma/client";
const prop = Prisma.ProductsScalarFireldEnum.prop;
```

15- next.config.mjs file
You are allowing Next/Image component to load images from specific remote domains, by setting the protocol and the host name.

## 16 - A VERY IMPORTANT ASPECT:

So our product item schema is consisted of: {id: string;
name: string;
company: string;
description: string;
featured: boolean;
image: string;
price: number;
createdAt: Date;
updatedAt: Date;
clerkId: string;}
Prisma by default creates an auto unique ID for each product. However, the clerkId is given only to the ADMIN!!!
17- If we have a combination of SSR and CSR components in 1 page they might be out of sync, and hence we might need to unify based on the situation.
