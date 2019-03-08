import Player from './Player'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPlayer } from '../actions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {locked: true};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      60 * 1000
    );
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      locked: new Date(this.props.players[0].tee_time) < new Date()
    });
  }

  render() {
    const { classes, players, groupIndex, selectPlayer } = this.props
    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemText primary={`Group ${groupIndex+1} ${this.state.locked ? ' (LOCKED)' : ''}`} />
        </ListItem>
        <List component="nav">
          {players.map(player => (
            <Player key={player.id} {...player} locked={this.state.locked} onClick={() => selectPlayer(player.id, groupIndex)} />
          ))}
        </List>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectPlayer: (id, groupIndex) => dispatch(selectPlayer(id, groupIndex))
    };
};
export default connect(null, mapDispatchToProps)(withStyles(styles)(PlayerList));
