export type Profile = {
  thumb: string;
  info: string;
  title: string;
  txt: string;
};

const ProfileCardItem = ({ profile }: { profile: Profile }) => {
  return (
    <div>
      <img
        src={profile.thumb}
        alt={profile.info}
        className="aspect-square w-[108px]"
      />
      <div className="mt-10 mb-6 text-2xl/[36px] font-bold tracking-[-0.36px]">
        {profile.title}
      </div>
      <p className="text-lg/[30px] tracking-[-0.27px] text-[#000000cc]">
        {profile.txt}
      </p>
      <button
        type="button"
        className="mt-6 cursor-pointer text-lg/[30px] font-bold tracking-[-0.27px] text-[#18a0fb]"
      >
        LEARN MORE
      </button>
    </div>
  );
};

export default ProfileCardItem;
