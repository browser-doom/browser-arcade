import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { FilesState } from '../../store/files/types';
import { AppState } from '../../store';
import Files from './Files';

interface AppProps {
  files: FilesState;
}

const App: React.FC = () => {
  return (
    <div>
      <Files></Files>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    files: state.files
  };
};

export default connect(mapStateToProps)(App);
