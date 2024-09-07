const handleResponse = (response) => {
  if (response.status === "OK") {
    console.log("createstudy ok~", response.data.path);
    navigate("/");
  } else if (response.status === 403) {
    console.log("unauthorized");
    openDialog(
      <Dialog
        header={<>Login</>}
        footer={
          <Button onClick={() => closeDialog("/login")}>네, 알겠습니다</Button>
        }
      ></Dialog>
    );
  } else {
    openDialog(
      <Dialog
        header={<>오류</>}
        footer={<Button onClick={closeDialog}>네, 알겠습니다</Button>}
      >
        <ul>
          {Object.keys && Object.keys(response.data).map((key) => (
            <li key={key}>
              {key} : {response.data[key]}
            </li>
          ))}
        </ul>
      </Dialog>
    );
  }
};

const HandleResponseApi = {
  handleResponse,
};

export default HandleResponseApi;
