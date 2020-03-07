import React from 'react';
import If from '../../../library/If';

class TranscriptsToUpload extends React.Component{
  constructor(props){
    super(props);
    this.state={
      displayUploadTranscript: false
    }
  }

  displayUploadTranscript = () => {
    this.setState({ displayUploadTranscript: true })
  }

  render(){
    return(
      <>
      <h4>Transcripts To Upload</h4>
      <div className="flex-container">
        <h5>Name</h5>
        <h5>Schedule</h5>
        <h5>Status</h5>
        <h5> </h5>
      </div>
      <ul>
      {this.state.transcriptsToUpload.map((transcript, idx) => (
        
          <li className="flex-container" key={idx}>  
            <div className="witness">{transcript.witnessName}</div>
            <div className="schedule date">{transcript.date.slice(28)} <br /> {new Date(transcript.date).toDateString()}</div>
            <div className="status"><button onClick={this.displayUploadTranscript}>Upload Transcript</button></div>
            <div className="more-dots">...</div>
          </li>

      ))}
    </ul>

    <If condition={this.state.displayUploadTranscript}>
      <div id="hidden-modal">
        {/* TODO: figure out how to upload a file */}
      </div>
    </If>
    </>
    )
  }
}

export default TranscriptsToUpload;