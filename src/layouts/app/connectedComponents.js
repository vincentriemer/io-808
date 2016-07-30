import { connect } from 'react-redux';

// Components
import SaveButton from 'components/saveButton';

export const ConnectedSaveButton = (() => {
  const mapStateToProps = (state) => ({
    storeState: state
  });

  return connect(mapStateToProps)(SaveButton);
})();
