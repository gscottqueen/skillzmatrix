import React, {Component} from 'react';

class SkillsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsJson: props.data,
      skills: [],
    };
    console.log(this.state.skillsJson)
  }

  componentWillMount() {
    this.state.skillsJson.then(data => {
      this.setState({
        skills: data.feed.entry,
      })
    });
  }

  render() {
    console.log(this.state.skills)
    return (
      <ul>
        {this.state.skills.map(function(skill, index) {
          return <li className="skill-group" key={index}>
            <ul>
              <li className="concept">{skill.gsx$concept.$t}</li>
              <li className="goal">{skill.gsx$goal.$t}</li>
              <li className="measure">{skill.gsx$measure.$t}</li>
              <li className="parent">{skill.gsx$parent.$t}</li>
            </ul>
          </li>
        })}
      </ul>
    );
  }

}

export default SkillsList;
