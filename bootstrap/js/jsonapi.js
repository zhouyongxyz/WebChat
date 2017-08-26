var jsonWebChatApi = {
    "id":"16815599ed644840be2f0f2dc216afbb",
    "funName":"login",
    "uid":"1851617789",
    "funType":"reqest",
    "page":0,
    "param":{"passwd":"12313131","pin":"1851617789","type":0}
};

var jsonwebChatApiReturn = {
    "id":"16815599ed644840be2f0f2dc216afbb",
    "funName":"login",
    "uid":"1851617789",
    "funType":"response",
    "page":0,
    "param":""
};

var jsonObjSendMessage = {
    "target":"Jerry",
    "targetType":1,
    "msgType":"txt",
    "msg":"hello",
    "msgImgUrl":"",
    "from":""
};

var jsonObjSendMessageReturn = {
    "code":0
};

var jsonObjGetContactListReturn = {
    "code":0,
    "infoItems":[{"remarkName":"Jerry","pin":"","nickname":"","avatarUrl":""}]
};

var jsonObjReceiveMessage = {
    "target":"Jerry",
    "msgType":"txt",
    "msg":"hello",
    "msgImgUrl":""
};

var jsonObjGetChatRecord = {
    "target":"Jerry"
};


var jsonObjGetChatRecordReturn = {
    "code":0,
    "infoItems":[{"owner":"myself","msgType":"txt","msg":"hello"}]
};

var jsonObjGetNearbyListReturn = {
    "code":0,
    "infoItems":[{"remarkName":"Jerry","pin":"","nickname":"","avatarUrl":"","gender":"","distance":"","remark":""}]
};

var jsonObjSendNearbyUserMsg = {
    "target":"Jerry",
    "msg":"hello"
}

