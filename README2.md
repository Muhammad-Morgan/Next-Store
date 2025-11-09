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

    ```js

    const updateTask = await prisma.task.update({
    where: {
        id: id,
    },
    data: {
        content: 'updated task',
    },
    });
    ```

    - Update or create records

    ```js
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

```
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
6- We switched to CSR for the NavSearch component because we need React Hoos and other APIs
