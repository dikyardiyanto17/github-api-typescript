import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/home.css";
import Profile from "../components/profile";
import "../css/card.css";

const Home = () => {
  const [inputUser, setInputUser] = useState<string>("");
  const [githubUser, setGithubUser] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstOpen, setFirstOpen] = useState<boolean>(true);
  const [userRepository, setUserRepository] = useState<any>([]);
  const [displayUser, setDisplayUser] = useState<boolean>(false);
  const [displayRepository, setDisplayRepository] = useState<boolean>(false);
  const fetchusers = async (username: string) => {
    setLoading(true);
    const res = await fetch(
      `https://api.github.com/search/users?q=${username}&per_page=5`
    );
    const data = await res.json();
    setGithubUser(data.items);
    setLoading(false);
  };

  const fetchRepos = async (username: string) => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    setUserRepository(data);
    setLoading(false);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUser !== "") {
      setInputUser(inputUser);
      fetchusers(inputUser);
      setFirstOpen(false);
      setInputUser("");
      setDisplayUser(true);
      setDisplayRepository(false);
    } else {
      alert("Input is empty");
    }
  };

  return (
    <>
      <div className="custom-padding">
        <h1 className="heading-title">Github User Search</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={inputUser}
              type="text"
              onChange={(e) => {
                setInputUser(e.target.value);
              }}
              placeholder="Search user"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {firstOpen === true && <h1>Type and Submit to search user</h1>}
        {loading === true && <h1>Loading...</h1>}
        {githubUser?.length === 0 &&
          firstOpen === false &&
          displayUser === true &&
          loading === false && <h1>User is not exist</h1>}
        <div className="d-flex justify-content-center flex-wrap">
          {githubUser?.length !== 0 &&
            displayUser === true &&
            githubUser.map((user: any) => {
              // return <User key={user.id} user={user}/>
              //   return <Profile key={user.id} user={user} />;
              return (
                <>
                  <div className="card" key={user.id}>
                    <div className="card-img">
                      <img src={user.avatar_url} />
                    </div>
                    <div className="desc">
                      <h6 className="primary-text custom-bold">{user.login}</h6>
                    </div>
                    <button
                      className="primary-text button-custom"
                      onClick={() => {
                        fetchRepos(user.login);
                        setGithubUser([]);
                        setDisplayRepository(true);
                        setDisplayUser(false);
                      }}
                    >
                      View Repository
                    </button>
                  </div>
                </>
              );
            })}
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {userRepository?.length !== 0 &&
            displayRepository === true &&
            userRepository.map((repo: any) => {
              // return <User key={user.id} user={user}/>
              //   return <Profile key={user.id} user={user} />;
              return (
                <>
                  <div className="card" key={repo.id}>
                    <div className="star-icon">
                      <span>{repo.stargazers_count} </span>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <div className="card-img">
                      <img src={repo.owner.avatar_url} />
                    </div>
                    <div className="desc-2">
                      <h6 className="primary-text-2 custom-bold-2">
                        {repo.name}
                      </h6>
                      {repo.description && (
                        <p className="secondary-text">
                          {repo.description.slice(0, 130)}
                          {repo.description.length >= 130 && (
                            <span>...readmore</span>
                          )}
                        </p>
                      )}
                      {repo.description === null && (
                        <p className="secondary-text">
                          There is no description
                        </p>
                      )}
                    </div>
                    <button className="primary-text button-custom">
                      <a href={repo.html_url} target="_blank" style={{textDecoration: 'none', color: 'white'}}>To Repository</a>
                    </button>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
