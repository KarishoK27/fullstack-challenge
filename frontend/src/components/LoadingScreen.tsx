import ReactLoading from "react-loading";
import "../styling/LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="Loading_screen-container">
      <ReactLoading
        type="spin"
        color={"black"}
        height={50}
        width={50}
        delay={50}
      />
    </div>
  );
};

export default LoadingScreen;
