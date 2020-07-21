/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/generalActions';

const AdminClientInfo = ({ loadUser, email, password, client }) => {
  useEffect(() => {
    loadUser(email, password);
  }, [loadUser, email, password]);

  let clientInfo;
  let birthdate;
  if (client) {
    clientInfo = client.authdata.user[0];
    birthdate = new Date(clientInfo.birthdate).toLocaleDateString();
  }

  return (
    <div>
      {client ? (
        <div className="info-content">
          <div className="info-text">
            <p>Identité</p>
            <hr />
            <p>Adresse</p>
            <hr />
            <p>Téléphone</p>
            <hr />
            <p>Date de naissance</p>
            <hr />
            <p>E-mail</p>
          </div>
          <hr />
          <div className="info-text">
            <p>
              {clientInfo.civility} <span>{clientInfo.lastname}</span>{' '}
              {clientInfo.firstname}
            </p>
            <hr />
            <p>
              {clientInfo.address}, {clientInfo.zipcode} {clientInfo.city},{' '}
              {clientInfo.country}
            </p>
            <hr />
            <p>{clientInfo.phone}</p>
            <hr />
            <p>{birthdate}</p>
            <hr />
            <p>{clientInfo.email}</p>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    client: state.auth.user,
  };
};

AdminClientInfo.propTypes = {
  client: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  email: PropTypes.string,
  password: PropTypes.string,
  loadUser: PropTypes.func,
};

AdminClientInfo.defaultProps = {
  client: [],
  email: '',
  password: '',
  loadUser: () => {},
};

export default connect(mapStateToProps, { loadUser })(AdminClientInfo);
