import useUsers from "@/hooks/useUsers";

import Avatar from "../Avatar";

const FollowBar = () => {
  //goes into useUsers hook, to fetch from our BE and DB -> api/users/ all users
  const { data: users = [] } = useUsers(); //default value of empty array
  //if no users we dont want to display anything
  if (users.length === 0) {
    return null;
  }

  // type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
  // type ThreeStringProps = {prop1: string, prop2: string, prop3: string}

  // type CatNames = "miffy" | "boris" | "mordred";
  // type CatList = Record<CatNames, {age: number}>
  // const cats: CatList = {
  //   miffy: { age:99 },
  //   boris: { age:16 },
  //   mordred: { age:600 }
  // }

  // RECORD has <key, value>

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
