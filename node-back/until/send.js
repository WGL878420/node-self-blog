function responseClient(res, httpCode = 500, code = 3, message = '服务端异常', data = null) {
    let responseData = {};
    responseData.code = code;
    responseData.message = message;
    responseData.model = data;
    res.status(httpCode).send(responseData);
}
module.exports = responseClient;