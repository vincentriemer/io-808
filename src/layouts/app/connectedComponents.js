import { connect } from 'react-redux';

// Action Creators
import { onStateLoad } from 'actionCreators';

// Components
import SaveButton from 'components/saveButton';
import LoadButton from 'components/loadButton';

export const ConnectedSaveButton = (() => {
  const mapStateToProps = (state) => ({
    storeState: state
  });

  return connect(mapStateToProps)(SaveButton);
})();

export const ConnectedLoadButton = (() => {
  const mapStateToProps = (state) => ({
    playing: state.playing
  });

  const mapDispatchToProps = (dispatch) => ({
    onLoadedState: (loadedState) => dispatch(onStateLoad(loadedState))
  });

  return connect(mapStateToProps, mapDispatchToProps)(LoadButton);
})();
