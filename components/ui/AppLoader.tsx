import {
    Audio,
    Circles,
    Grid,
    RotatingLines,
    ThreeDots
  } from "react-loader-spinner";
  
  type Props = {
    type?: string;
    width?: string;
    divWrapped?: boolean;
  };
  
  const AppLoader = (props: Props) => {
    const { type, width, divWrapped = true } = props;
  
    const renderLoader = () => {
      switch (type) {
        case "audio":
          return (
            <Audio
              height="80"
              width="80"
              color="purple"
              ariaLabel="three-dots-loading"
            />
          );
        case "circles":
          return (
            <Circles
              height="80"
              width="80"
              color="#5F2EEA"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          );
        case "three-dots":
          return (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#5F2EEA"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          );
        case "rotating-lines":
          return (
            <RotatingLines
              strokeColor="green"
              strokeWidth="5"
              animationDuration="0.75"
              width={width ? width : "80"}
              visible={true}
            />
          );
        default:
          return (
            <Grid
              height="80"
              width="80"
              color="#5F2EEA"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          );
      }
    };
    return (
      <>
        {divWrapped ? (
          <div className="flex flex-col justify-center items-center align-items-center h-screen w-screen bg-white">
            {renderLoader()}
          </div>
        ) : (
          renderLoader()
        )}
      </>
    );
  };
  
  export default AppLoader;
  