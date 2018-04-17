import React from 'react';
import { /* Field, */ reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { getGroups, addGroup } from '../actions';
import EventDetailGroupRow from './EventDetailGroupRow';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions, arrow-body-style,
        jsx-a11y/label-has-for
        */
const renderGroups = ({
  load, fields, eventId, meta: { error },
}) => {
  if (eventId) load(eventId);
  return (
    <ul>
      <li key={-1}>
        <button type="button" onClick={() => fields.push()}>
        Add Group
        </button>
      </li>
      {fields.map((group, index) => (
        <li key={`${group}.row`}>
          <EventDetailGroupRow fields={fields} groupText={group} index={index} />
        </li>
      ))}
      {error && <li key={-2} className="error">{error}</li>}
    </ul>);
};
const onKeyPress = (event) => {
  // console.log(`kp event ${JSON.stringify(event.which)}`);
  if (event.which === 13 /* Enter */) {
    event.preventDefault();
  }
};
const EventDetailsGroups = (props) => {
  // console.log(`Event Detail Group history? ${props.history}`);
  const {
    load, history,
  } = props;
  const {
    pristine, /* reset, */ submitting,
  } = props;
  // const handleFormSubmit = () => {
  //   // const dirties = formValues('groupFA').map((f, i) => {
  //   //   if (f.dirty) console.log(`f.name ${f.name} is dirty`);
  //   //   return { dirty: f.dirty, i };
  //   // });
  //   // console.log(dirties);
  //   // values.groupFA.forEach((group) => {
  //   //   if (!group.id) {
  //   //     add(group);
  //   //     console.log(`${group.name} is new`);
  //   //   } else {
  //   //     const keys = Object.keys(group);
  //   //     let i = 0;
  //   //     const L = keys.length;
  //   //     for (;i < L && !group[keys[i]].dirty; i++);
  //   //     if (i < L) {
  //   //       edit(group);
  //   //       console.log(`${group.name} is dirty`);
  //   //     }
  //   //     console.log(`${group.name} time type ${typeof group.time}`);
  //   //   }
  //   //   // console.log(`detail group ${JSON.stringify(group)} || ${Object.keys(group)} `);
  //   // });
  //   history.push('/events');
  // };

  const eventId = props.eventId || 2;
  // console.log(`Groups load type ${typeof load}`);
  // console.log(`Groups getGroups type ${typeof getGroups}`);
  return (
    <form onKeyPress={onKeyPress} >
      <FieldArray name="groupFA" component={renderGroups} eventId={eventId} load={load} />
      <button
        type="button"
        disabled={submitting || !pristine}
        onKeyPress={onKeyPress}
        onClick={() => history.push('/events')}
      >
          Return to Events
      </button>
    </form>
  );
};
const EventDetail = reduxForm({
  form: 'eventdetailGroups', // a unique identifier for this form
  touchOnBlur: true,
})(EventDetailsGroups);
// export default EventDetail;

export default connect(state => ({
  initialValues: { groupFA: state.groups },
}), dispatch => ({
  load: eventId => dispatch(getGroups(eventId)),
  add: group => dispatch(addGroup(group)),
}
))(EventDetail);

// const selector = formValueSelector('EventDetailsGroups');
// const FA = connect((state) => {
//   const fa = selector(state, 'groupFA');
//   return {
//     fa,
//   };
// })(EventDetail);
// console.log(JSON.stringify(FA));