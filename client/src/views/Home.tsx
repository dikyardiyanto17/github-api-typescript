import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/home.css";
import Profile from "../components/profile";

const Home = () => {
  const [inputUser, setInputUser] = useState<string>("");
  const [githubUser, setGithubUser] = useState<any>([]);
  const fetchRepos = async (username: string) => {
    const res = await fetch(
      `https://api.github.com/search/users?q=${username}&per_page=5`
    );
    const data = await res.json();
    setGithubUser(data.items);
  };
  console.log(githubUser);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUser !== "") {
      setInputUser(inputUser);
      fetchRepos(inputUser);
      setInputUser("");
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
        {githubUser?.length === 0 && <h1>User is not exist</h1>}
        <div className="d-flex justify-content-center flex-wrap">
          {githubUser?.length !== 0 &&
            githubUser.map((user: any) => {
              return <Profile key={user.id} user={user} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
