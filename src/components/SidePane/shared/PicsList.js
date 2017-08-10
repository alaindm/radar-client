import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import * as actions from '../../../actions';
import TextWithLinks from './TextWithLinks'
import './PicsList.css'

class PicsList extends Component {
  renderPicCard = (item) => {
    return (
        <Card className="card" key={item.id}>
          {item.location && (<div onClick={ () => this.props.history.push(`/location/${item.location.id}`) } style={ {'cursor': 'pointer'} }><PlaceIcon /><span>{item.location.name}</span></div>)}
          <CardMedia
            overlay={<CardTitle title={moment(item.date*1000).fromNow()} subtitle={`${item.likes.count} likes`} />}
          >
            <img src={item.thumbnail_src} alt="from post" />
          </CardMedia>
          <CardTitle  subtitle={`${item.comments.count} comments`} />
          <CardText>
            <TextWithLinks text={item.caption} />
          </CardText>
          <CardActions>
            <FlatButton label="See Full Post" onClick={ () => this.props.history.push(`/post/${item.code}`) } />
          </CardActions>
        </Card>
    )
  }

  render() {
    return (
      <div>
        {(this.props.pics.length > 0) && this.props.pics.map(this.renderPicCard)}
      </div>

    )
  }
}

const mapStateToProps = state => {
  return { 
    pics: state.insta.pics
   }
}

export default withRouter(connect(mapStateToProps, actions)(PicsList))


