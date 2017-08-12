import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardTitle } from "material-ui/Card";
import TabsWithContent from "./shared/TabsWithContent";
import * as actions from "../../actions";

class Region extends Component {
  componentDidMount() {
    if (this.props.pics.length < 1) {
      this.props.getMultiLocationPics();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mapState !== nextProps.mapState) {
      this.props.getMultiLocationPics();
    }
  }

  render() {
    const regionHeader = () => {
      return (
        <Card>
          <CardTitle title="Latest photos in the selected map region" />
        </Card>
      );
    };
    return <TabsWithContent header={regionHeader} />;
  }
}

function mapStateToProps(state) {
  return {
    mapState: state.insta.mapState,
    pics: state.insta.pics
  };
}

export default connect(mapStateToProps, actions)(Region);
