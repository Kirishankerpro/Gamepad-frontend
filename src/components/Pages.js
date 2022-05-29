import "../assets/style/Pages.css";

// state page

const Pages = ({ data, setPageNumber, pageNumber }) => {
  /*   const data = props.data;
  const setPageNumber = props.setPageNumber; */
  /* 
  useEffect(() => {
    const backButton = () => {
      setPageNumber(pageNumber + 1);
    };
  }); */

  return (
    <div className="pages">
      {pageNumber === 1 ? (
        <button id="previous-button-1"> Home </button>
      ) : (
        <button
          id="previous-button"
          onClick={() => {
            setPageNumber(pageNumber - 1);
          }}
        >
          Previous
        </button>
      )}

      {pageNumber === 1 ? (
        <p style={{ color: "#ff4656" }}> {pageNumber}</p>
      ) : (
        <p style={{ color: "#201f24" }}> {pageNumber}</p>
      )}
      <button
        id="next-button"
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pages;
