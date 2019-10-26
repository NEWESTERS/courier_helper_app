const globalVariables = `
var myMap;
var route;
`

const mapInitLogic = () => {
        ymaps.ready(init);
        function init(){
            myMap = new ymaps.Map("map", {
                center: [55.77, 37.43],
                zoom: 13,
                controls: []
            });

            window.ReactNativeWebView.postMessage('mapInitialized');
        }
};

const mapInitLogicString = `${globalVariables} (${mapInitLogic.toString()})()`;

const mapRouteLogic = () => {
    myMap.geoObjects.remove(route);

    var referencePoints = $RP;

    if(referencePoints.length === 0) {
        return;
    }

    route = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: referencePoints,
        // Параметры маршрутизации.
        params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 2,
            avoidTrafficJams: true
        }
    }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
    });

    myMap.geoObjects
        .add(route);
}

const createMapRouteLogicString = (rp) => `(${mapRouteLogic.toString().replace("$RP", JSON.stringify(rp))})()`;

export { mapInitLogicString, createMapRouteLogicString };