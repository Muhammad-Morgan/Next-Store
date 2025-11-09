import { LuUser } from "react-icons/lu";
import { currentUser, auth } from "@clerk/nextjs/server";

const UserIcon = async () => {
  // only userID: clerkID
  // const { userId } = auth();
  // this gets all info
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="profile-image"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }
  return (
    <LuUser
      style={{ width: "21px", height: "21px" }}
      className="bg-primary text-white dark:bg-primary-foreground rounded-full "
    />
  );
};

export default UserIcon;
