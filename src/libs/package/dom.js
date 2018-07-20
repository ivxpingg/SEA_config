/*
 * dom 操作工具
 */

/**
 * 获取节点在父节点中的索引，如果出错返回null
 * @param node {Node}
 * @constructor
 * @return {Number | Null}
 */
var GetNodeIdx = (node) => {
    var parentNodeList = node.parentNode.childNodes;
    var length = parentNodeList.length;

    try {
        for (var i = 0; i < length; i++) {
            if (node === parentNodeList[i]) {
                return i;
            }
        }
        return null;
    }
    catch (e) {
        return null;
    }
}

var DG = () => {

}

export default {
    getNodeIdx: GetNodeIdx,
    dg: DG
}