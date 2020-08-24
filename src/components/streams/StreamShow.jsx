import React from 'react';
const flv = require('flv.js');
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';


class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();

    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();


    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        const { id } = this.props.match.params;
        if (this.player || !this.props.stream) return;

        this.player = flv.createPlayer({
            type: 'flv',
            isLive: true,
            url: `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();

    }

    render() {
        if (!this.props.stream) return <div>Loading...</div>;

        const { streamTitle, streamDescription } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{streamTitle}</h1>
                <h5>{streamDescription}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}
export default connect(mapStateToProps, { fetchStream })(StreamShow);
