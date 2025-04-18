import ProfileCardItem, { Profile } from "./ProfileCardItem";

const ProfileCard = ({ profileList }: { profileList: Profile[] }) => {
  return (
    <ul className="mt-[70px] flex gap-5">
      {profileList.map((item, index) => (
        <li key={index}>
          <ProfileCardItem profile={item} />
        </li>
      ))}
    </ul>
  );
};

export default ProfileCard;
