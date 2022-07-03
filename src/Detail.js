import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  adopt = () => (window.location = "http://bit.ly/pet-adopt");
  render() {
    console.log("====", this.state);
    let [theme] = this.context;
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, images, name, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />;
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button onClick={this.toggleModal} style={{ background: theme }}>
            Adopt {name}
          </button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>would you like to adopt {name} ?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}
Details.contextType = ThemeContext;
const DetailWithRouter = withRouter(Details);
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailWithRouter {...props} />
    </ErrorBoundary>
  );
}
