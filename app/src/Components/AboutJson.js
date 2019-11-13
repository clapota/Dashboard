import styles from './DebugPrint.css';

import autoBind from 'react-autobind';
import classNames from 'classnames';
import React from 'react';

class DebugPrint extends React.PureComponent {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      show: true,
    }
  }    

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.header} onClick={this.toggle}>
        </div>
        {this.state.show 
          ? (
            <pre style={styles.pre}>
              {JSON.stringify(this.props.data, null, 2) }
            </pre>
          )
          : null
        }
      </div>
    )
  }
}


function AboutJson(props) {
    console.log('IP DE BABoutE : ' + props.ip);
    console.log('RENDU DEUX FOIS DEUX');
    const object = {
        client: {
            host: props.ip,
        },
        server: {
            current_time: Math.round((new Date()).getTime() / 1000),
        },
        services: [
            {
                name: 'youtube',
                widgets: [
                    {
                        name: 'youtube_subscribers',
                        description: 'Display the number of subscribers for the selected user',
                        params: [
                            {
                                name: 'username',
                                type: 'string'
                            }
                        ]
                    },
                    {
                        name: 'youtube_views',
                        description: 'Display the number of views for the selected video',
                        params: [
                            {
                                name: 'link',
                                type: 'string',
                            }
                        ]
                    },
                    {
                        name: 'youtube_comment',
                        description: 'Display the list of the last comment for the selected video',
                        params: [
                            {
                                name: 'link',
                                type: 'string',
                            },
                            {
                                name: 'maxResult',
                                type: 'integer'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'weather',
                widgets: [
                    {
                        name: 'city_temperature',
                        description: 'Display temperature for a city',
                        params: [
                            {
                                name: 'city',
                                type: 'string',
                            },
                            {
                                name: 'unit',
                                type: 'string',
                            }
                        ]
                    }
                ]
            },
            {
                name: 'twitch',
                widgets: [
                    {
                        name: 'twitch_stream',
                        description: 'Display the thumbnail, the title and the number of viewer if the streamer is streaming',
                        params: [
                            {
                                name: 'username',
                                type: 'string',
                            }
                        ]
                    },
                    {
                        name: 'twitch_subscribers',
                        description: 'Display the number of subscribers for the selected user',
                        params: [
                            {
                                name: 'username',
                                type: 'string',
                            }
                        ]
                    }
                ]
            }
        ]
    }
    return (<DebugPrint data={object} />);
}

export default AboutJson;