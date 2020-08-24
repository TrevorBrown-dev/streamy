import React, { useEffect } from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import { Link } from "react-router-dom";
import StreamList from "./StreamList";

const StreamDelete = (props) => {
  useEffect(() => {
    fetchStream(props.match.params.id);
  }, []);

  const onDelete = () => {
    props.deleteStream(props.match.params.id);
  };

  const onDismiss = () => {
    history.push("/");
  };

  const renderContent = () => {
    if (!props.stream) return "Are you sure you want to delete this stream?";
    return (
      <React.Fragment>
        Are you sure you want to delete{" "}
        <strong>{props.stream.streamTitle}</strong>?
      </React.Fragment>
    );
  };

  const actions = (
    <React.Fragment>
      <button onClick={onDelete} className="ui button negative">
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );
  return (
    <div>
      <StreamList />
      <Modal
        onDelete={onDelete}
        title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={onDismiss}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
