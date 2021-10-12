export default function () {
    const containerDom = document.createElement('div');
    containerDom.setAttribute('id', 'aaaa');
    const titleDom = document.createElement('p');
    titleDom.innerText = '99乘法表';
    containerDom.append(titleDom);
    const tableDom = document.createElement('table');
    tableDom.setAttribute('algin', 'center');
    containerDom.append(tableDom);
    for (var i = 1; i <= 9; i++) {
        const trDom = document.createElement('tr');
        for (var j = 1; j <= i; j++) {
            const tdDom = document.createElement('td');
            tdDom.innerText = j + "*" + i + "=" + (j * i);
            trDom.append(tdDom);
        }
        tableDom.append(trDom);
    }
    containerDom.append(tableDom);
    document.body.append(containerDom);
}