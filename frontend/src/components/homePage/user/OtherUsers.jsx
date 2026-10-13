import OtherUser from "./OtherUser";
import useGetOtherUsers from "../../../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

export default function OtherUsers({ searchQuery }) {

  useGetOtherUsers();
  
  const { otherUsers } = useSelector(store => store.user);
  
  if (!otherUsers || otherUsers.length === 0) {
    return (
      <div className="mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:px-7 lg:block lg:space-y-2 lg:overflow-visible">
        <p className="text-gray-500">No other users found.</p>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleUsers = normalizedQuery
    ? otherUsers.filter((user) =>
        `${user.fullName} ${user.email}`.toLocaleLowerCase().includes(normalizedQuery)
      )
    : otherUsers;

  if (visibleUsers.length === 0) {
    return (
      <div className="mt-5 px-5 pb-1 sm:px-7">
        <p className="text-gray-500">No users match your search.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex overflow-x-auto px-5 pb-1 sm:px-7 lg:block lg:overflow-visible">
      {visibleUsers.map((user) => (
        <OtherUser
          user={{
            ...user,
            name: user.fullName,
            time: "",
            color: "bg-teal-300",
          }}
          key={user._id}
        />
      ))}
    </div>
  );
}