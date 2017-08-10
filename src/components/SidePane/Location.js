import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import {Card, CardTitle} from 'material-ui/Card';
import TabsWithContent from './shared/TabsWithContent'
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import {getSingleLocationPics} from '../../actions';

class Location extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.locationData.idOriginal !== id && this.props.getSingleLocationPics({id})
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params !== nextProps.match.params) {
      const { id } = nextProps.match.params;
      this.props.getSingleLocationPics({id})
    }    
  }

  render() {
    const locationHeader = () => {
      return (
        <Card>
          <CardTitle title={
            <div 
              onClick={ () => this.props.history.push(`/location/${this.props.locationData.id}`) } 
              style={{
                'cursor': 'pointer',
                'position': 'relative'
              }}
              >
              <PlaceIcon 
                color="grey"
                hoverColor="black"
              />
              <span 
                style={{
                  position: 'absolute', 
                  top: '50%',
                  transform: 'translateY(-50%)',
                  whiteSpace: 'nowrap'
                }}
                >
                 {this.props.locationData.name} 
              </span>
            </div>
          } />
        </Card>
      )
    }

    return (
      <TabsWithContent header={locationHeader} />
    )
  }
}

function mapStateToProps(state) {
  return { 
    locationData: state.insta.locationData
   };
}

export default withRouter(connect(mapStateToProps, {getSingleLocationPics})(Location))


