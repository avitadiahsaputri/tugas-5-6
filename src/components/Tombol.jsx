import '../App.css'


const Tombol = (props) => {
  // const condition1 = {
  //   backgroundColor: "",
  //   padding: 10,
  //   margin: 10,
  //   marginLeft :20,
  //   borderRadius: 5,
  //   fontFamily: "Popins",
  //   fontWeight: "bold",
  //   cursor: "pointer",
  // };



  return (
    <>
      <button onClick={props.handleClick}>
        {props.icon && <props.icon />} {props.teks}
      </button>
    </>
  );
};


export default Tombol