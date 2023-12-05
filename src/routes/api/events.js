'use strict';

module.exports.register = async server => {

    server.route( {
        method: 'GET',
        path: '/api/events',
        handler: async request => {
            try {
              const db = request.server.plugins.sql.client;
              const api = ''
              const res = await db.events.getApi(api);
              //console.log(api);
             // console.log(res.recordset);
              return res.recordset;

            } catch( err ){
                console.log('erro',err);
            }

        }
    });

};