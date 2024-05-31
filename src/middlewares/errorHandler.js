const { StatusCodes } = require ('http-status-codes')

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong!' });
  };
  