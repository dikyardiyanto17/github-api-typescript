import '../css/profile.css'
interface Props {
  user: {
    login: string,
    avatar_url: string,
  }
}
const Profile = ({user}: Props) => {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <img src={user.avatar_url} />
        </div>
        <div className="desc">
          <h6 className="primary-text custom-bold">{user.login}</h6>
        </div>
        <button className="primary-text button-custom">View Repository</button>
      </div>
    </>
  );
};

export default Profile;
