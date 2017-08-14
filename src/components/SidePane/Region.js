/*global FB*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardTitle } from "material-ui/Card";
import TabsWithContent from "./shared/TabsWithContent";
import * as actions from "../../actions";

class Region extends Component {
  constructor(props) {
    super(props);
    this.timer = 150;
    this.counter = 1;
    this.FBcheckBeforeGetPics = () => {
      const FB = window.FB;
      const that = this;
      if (FB) {
        this.props.getMultiLocationPics();
      } else {
        setTimeout(function() {
          this.counter++;
          this.timer = this.timer + this.counter * 100;
          that.FBcheckBeforeGetPics();
        }, this.timer);
      }
      if (this.counter > 10) return;
    };
  }

  componentDidMount() {
    if (this.props.pics.length < 1 && this.props.mapState.bounds) {
      console.log("did", this.props);
      this.FBcheckBeforeGetPics();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("this", this.props.mapState.bounds);
    console.log("next", nextProps.mapState.bounds);
    if (
      // this.props.mapState.center.lat.toFixed(5) !==
      // nextProps.mapState.center.lat.toFixed(5)
      this.props.mapState.bounds !== nextProps.mapState.bounds
    ) {
      this.FBcheckBeforeGetPics();
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
