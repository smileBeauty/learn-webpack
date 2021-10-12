(function (global, factory) {
  // 判断执行环境
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = global || self, factory(global.React = {}));
}(this, (function (exports) {
  // 定义各种类型常量 支持Symbol的情况下用Symbol.for生成常量
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  exports.Fragment = 0xeacb;
  exports.StrictMode = 0xeacc;
  exports.Profiler = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  exports.Suspense = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;
  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    exports.Fragment = symbolFor('react.fragment');
    exports.StrictMode = symbolFor('react.strict_mode');
    exports.Profiler = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    exports.Suspense = symbolFor('react.suspense');
    REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy1');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
    REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
  }
  /**
   * 获取迭代器
   * @return 没有返回null
   */
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }
    // 从外面挪到里面 读代码方便
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable['@@iterator'];
    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }
    return null;
  }
  /**
   * 拷贝一个对象(from)中的非原型链上的属性到另一个对象(to) 浅拷贝
   */
  var _assign = function (to, from) {
    for (var key in from) {
      if (Object.prototype.hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  };
  /**
   * Object.assign的降级处理
   */
  var assign = Object.assign || function (target) {
    var to = Object(target);
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource != null) {
        _assign(to, Object(nextSource));
      }
    }
    return to;
  };
  var ReactCurrentDispatcher = {
    current: null
  };
  var ReactCurrentBatchConfig = {
    transition: 0
  };
  var ReactCurrentOwner = {
    current: null
  };
  var ReactDebugCurrentFrame = {};
  var currentExtraStackFrame = null;
  function setExtraStackFrame(stack) {
    currentExtraStackFrame = stack;
  }
  ReactDebugCurrentFrame.setExtraStackFrame = function (stack) {
    currentExtraStackFrame = stack;
  };
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';
    if (currentExtraStackFrame) {
      stack += currentExtraStackFrame;
    }
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }
    return stack;
  };
  var IsSomeRendererActing = {
    current: false
  };
  var ReactSharedInternals = {
    ReactCurrentDispatcher,
    ReactCurrentBatchConfig,
    ReactCurrentOwner,
    IsSomeRendererActing,
    assign,
    ReactDebugCurrentFrame
  };
  /**
   * console.warn信息
   */
  function warn(format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    printWarning('warn', format, args);
  }
  /**
   * console.error信息
   */
  function error(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    printWarning('error', format, args);
  }
  function printWarning(level, format, args) {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    }
    var argsWithFormat = args.map(function (item) {
      return '' + item;
    });
    argsWithFormat.unshift('Warning: ' + format);
    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
  /**
   * 用组件名.调用的方法(eg: ReactClass.setState)作为key 不重复打印警告信息
   */
  var didWarnStateUpdateForUnmountedComponent = {};
  /**
   * 根据传入的组件实例和调用的方法打印出警告信息
   */
  function warnNoop(publicInstance, callerName) {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
  var ReactNoopUpdateQueue = {
    isMounted: function (publicInstance) {
      return false;
    },
    enqueueForceUpdate: function (publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },
    enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, 'replaceState');
    },
    enqueueSetState: function (publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, 'setState');
    }
  };
  /**
   * 定义Component
   */
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = Object.freeze({});
    this.updater = updater || ReactNoopUpdateQueue;
  }
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function (partialState, callback) {
    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    }
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };
  // 为即将废弃的api输出警告
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
  function ComponentDummy() { }
  ComponentDummy.prototype = Component.prototype;
  /**
   * 定义PureComponent 浅比较
   */
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = Object.freeze({});
    this.updater = updater || ReactNoopUpdateQueue;
  }
  // PureComponent继承ComponentDummy 其实就是继承Component原型上的方法
  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  // 修改PureComponent的构造函数
  pureComponentPrototype.constructor = PureComponent;
  // 复制Component原型上的方法
  assign(pureComponentPrototype, Component.prototype);
  // 定义PureComponent的flag
  pureComponentPrototype.isPureReactComponent = true;
  /**
   * 返回一个不可变更属性的对象 直到有current属性
   */
  function createRef() {
    var refObject = {
      current: null
    };
    Object.seal(refObject);
    return refObject;
  }
  /**
   * 获取hoc的组件名
   */
  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
  }
  /**
   * 获取context的名字
   */
  function getContextName(type) {
    return type.displayName || 'Context';
  }
  /**
   * 获取组件的名字
   */
  function getComponentName(type) {
    if (type == null) {
      return null;
    }
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }
    if (typeof type === 'string') {
      return type;
    }
    switch (type) {
      case exports.Fragment:
        return 'Fragment';
      case REACT_PORTAL_TYPE:
        return 'Portal';
      case exports.Profiler:
        return 'Profiler';
      case exports.StrictMode:
        return 'StrictMode';
      case exports.Suspense:
        return 'Suspense';
      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';
    }
    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + '.Consumer';
        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + '.Provider';
        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');
        case REACT_MEMO_TYPE:
          return getComponentName(type.type);
        case REACT_BLOCK_TYPE:
          return getComponentName(type._render);
        case REACT_LAZY_TYPE:
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return getComponentName(init(payload));
          } catch (x) {
            return null;
          }
      }
    }
    return null;
  }
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  // 判断是否输出过this.props.key的警告
  var specialPropKeyWarningShown;
  // 判断是否输出过this.props.ref的警告
  var specialPropRefWarningShown;
  // 同一个组件下的相同的字符串类型的ref 不重复输出警告
  var didWarnAboutStringRefs = {};
  /**
   * 判断是否有ref
   */
  function hasValidRef(config) {
    if (hasOwnProperty$1.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
    return config.ref !== undefined;
  }
  /**
   * 判断是否有key
   */
  function hasValidKey(config) {
    if (hasOwnProperty$1.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
    return config.key !== undefined;
  }
  /**
   * 定义对象的key getter方法
   */
  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
  /**
   * 定义对象的ref getter方法
   */
  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
  /**
   * 针对字符串的ref输出警告
   */
  function warnIfStringRefCannotBeAutoConverted(config) {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);
      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
  /**
   * 定义react element的结构属性
   * type key ref self的value source的value owner props
   */
  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      ref: ref,
      props: props,
      _owner: owner
    };
    element._store = {};
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
    return element;
  };
  /**
   * 创建react element元素 第三个元素开始都是children
   */
  function createElement(type, config, children) {
    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        warnIfStringRefCannotBeAutoConverted(config);
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }
      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source;
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      if (Object.freeze) {
        Object.freeze(childArray);
      }
      props.children = childArray;
    }

    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
  /**
   * 复制一个元素 并用新的key替换旧的key
   */
  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement;
  }
  /**
   * 克隆react element
   */
  function cloneElement(element, config, children) {
    if (!!(element === null || element === undefined)) {
      throw Error("React.cloneElement1(...): The argument must be a React element, but you passed " + element + ".");
    }
    var propName;
    var props = assign({}, element.props);
    var key = element.key;
    var ref = element.ref;
    var self = element._self;
    var source = element._source;
    var owner = element._owner;
    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }
      if (hasValidKey(config)) {
        key = '' + config.key;
      }
      var defaultProps;
      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }
      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    }
    var childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  /**
   * 验证是否是react element
   */
  function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  /**
   * 将传入的参数中的 =替换成=0 :替换成=2 最后在字符串前面加上$
   */
  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = key.replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }
  /**
   * 用Map作为children的警告
   */
  var didWarnAboutMaps = false;
  /**
   * 替换入参中的/ 成两个// 例如:a/b/c->a//b//c
   */
  function escapeUserProvidedKey(text) {
    return text.replace(/\/+/g, '$&/');
  }
  /**
   * 获取元素的key escape格式化 如果没有key属性 则将获取的index转成36进制
   */
  function getElementKey(element, index) {
    if (typeof element === 'object' && element !== null && element.key != null) {
      return escape('' + element.key);
    }
    return index.toString(36);
  }
  /**
   * children 就是react组件的children属性 
   * array mappedChild的容器
   * escapedPrefix children被替换的新key的前缀
   * nameSoFar 目前组件的name
   * callback 回调函数
   * 返回的是子组件的层级
   */
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if (type === 'undefined' || type === 'boolean') {
      children = null;
    }
    var invokeCallback = false;
    // invokeCallback有几种情况 会是true
    // 1.children类型是 undefined boolean string number
    // 2.children类型是 object 且是react元素或者react的portal
    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;
        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }
      }
    }
    if (invokeCallback) {
      var _child = children;
      var mappedChild = callback(_child);
      // 除非 mappedChild 为Array 否则callback就是下面的函数
      // function (child) {
      //   return func.call(context, child, count++);
      // }
      // func计算chidlren数量的函数
      var childKey = nameSoFar === '' ? '.' + getElementKey(_child, 0) : nameSoFar;
      if (Array.isArray(mappedChild)) {
        var escapedChildKey = '';
        if (childKey != null) {
          escapedChildKey = escapeUserProvidedKey(childKey) + '/';
        }
        mapIntoArray(mappedChild, array, escapedChildKey, '', function (c) {
          return c;
        });
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey('' + mappedChild.key) + '/' : '') + childKey);
        }
        array.push(mappedChild);
      }
      return 1;
    }
    var child;
    var nextName;
    var subtreeCount = 0;
    var nextNamePrefix = nameSoFar === '' ? '.' : nameSoFar + ':';
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getElementKey(child, i);
        subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
      }
    } else {
      var iteratorFn = getIteratorFn(children);
      if (typeof iteratorFn === 'function') {
        var iterableChildren = children;

        if (iteratorFn === iterableChildren.entries) {
          if (!didWarnAboutMaps) {
            // 判断Map可以用这个方法
            warn('Using Maps as children is not supported. ' + 'Use an array of keyed ReactElements instead.');
          }
          didWarnAboutMaps = true;
        }
        var iterator = iteratorFn.call(iterableChildren);
        var step;
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getElementKey(child, ii++);
          subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        }
      } else if (type === 'object') {
        var childrenString = '' + children;
        throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + "). If you meant to render a collection of children, use an array instead.");
      }
    }
    return subtreeCount;
  }
  /**
   * children 就是组件的children属性
   * func 处理函数 有3种情况 在最后列出
   * context func的执行作用域
   * 返回数组 数组中放的是被格式化的 children
   */
  // 1.计算children数量 function () {
  //   n++;
  // }
  // 2.循环children function () {
  //   arguments 为 children 和 0
  //   forEachFunc.apply(this, arguments);
  // }
  // 3.将children转成数组 function (child) {
  //   return child;
  // }
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    var count = 0;
    mapIntoArray(children, result, '', '', function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  /**
   * 计算children的数量
   * children 就是组件的children属性
   */
  function countChildren(children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  }

  /**
   * 循环children的方法
   * children 组件的属性
   * forEachFunc 消费者提供的循环的方法
   * forEachContext forEachFunc执行的作用域
   */
  function forEachChildren(children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments);
    }, forEachContext);
  }
  /**
   * 将children转成数组返回的方法
   * children 组件的属性
   */
  function toArray(children) {
    return mapChildren(children, function (child) {
      return child;
    }) || [];
  }
  /**
   * react组件的children只能有一个react元素
   */
  function onlyChild(children) {
    if (!isValidElement(children)) {
      throw Error("React.Children.only expected to receive a single React element child.");
    }
    return children;
  }
  /**
   * 创建一个 context
   * defaultValue context的默认值
   * calculateChangedBits 
   */
  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // 有两种render
      // primary: React Native, React DOM
      // secondary: Fabric, React ART
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // _threadCount 记录有多少个同时渲染
      _threadCount: 0,
      Consumer: null,
      _currentRenderer: null,
      _currentRenderer2: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
    var hasWarnedAboutDisplayNameOnConsumer = false;
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      },
      displayName: {
        get: function () {
          return context.displayName;
        },
        set: function (displayName) {
          if (!hasWarnedAboutDisplayNameOnConsumer) {
            warn('Setting `displayName` on Context.Consumer has no effect. ' + "You should set it directly on the context with Context.displayName = '%s'.", displayName);
            hasWarnedAboutDisplayNameOnConsumer = true;
          }
        }
      }
    });
    context.Consumer = Consumer;
    return context;
  }

  var Uninitialized = -1;
  var Pending = 0;
  var Resolved = 1;
  var Rejected = 2;
  /**
   * 懒加载组件的初始化方法
   * payload {_status: -1, _result: ctor}
   * 返回构造函数 class 或者 function
   */
  function lazyInitializer(payload) {
    if (payload._status === Uninitialized) {
      var ctor = payload._result;
      var thenable = ctor();
      var pending = payload;
      pending._status = Pending;
      pending._result = thenable;
      thenable.then(function (moduleObject) {
        if (payload._status === Pending) {
          var defaultExport = moduleObject.default;
          if (defaultExport === undefined) {
            error('lazy1: Expected the result of a dynamic import() call. ' + 'Instead received: %s\n\nYour code should look like: \n  ' + 'const MyComponent = lazy1(() => imp' + "ort('./MyComponent'))", moduleObject);
          }
          var resolved = payload;
          resolved._status = Resolved;
          resolved._result = defaultExport;
        }
      }, function (error) {
        if (payload._status === Pending) {
          var rejected = payload;
          rejected._status = Rejected;
          rejected._result = error;
        }
      });
    }

    if (payload._status === Resolved) {
      return payload._result;
    } else {
      throw payload._result;
    }
  }
  /**
   * React.lazy懒加载组件方法
   * ctor 包裹着构造函数的方法
   * 返回 lazyType {$$typeof: REACT_LAZY_TYPE, _payload: payload, _init: lazyInitializer, defaultProps, propTypes}
   */
  function lazy(ctor) {
    var payload = {
      _status: -1,
      _result: ctor
    };
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _payload: payload,
      _init: lazyInitializer
    };

    var defaultProps;
    var propTypes;

    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy1(...): It is not supported to assign `defaultProps` to ' + 'a lazy1 component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps;
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy1(...): It is not supported to assign `propTypes` to ' + 'a lazy1 component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes;
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
    return lazyType;
  }
  /**
   * forwardRef 传递ref的方法
   */
  function forwardRef(render) {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef1 requires a render function but received a `memo1` component. Instead of forwardRef1(memo1(...)), use ' + 'memo1(forwardRef1(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef1 requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef1 render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }
    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef1 render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
    var elementType = {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        if (render.displayName == null) {
          render.displayName = name;
        }
      }
    });
    return elementType;
  }
  var enableScopeAPI = false; // Experimental Create Event Handle API.
  /**
   * 判断元素的类型是不是合法
   */
  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    }
    if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
      return true;
    }
    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
        return true;
      }
    }
    return false;
  }
  /**
   * react memo方法
   */
  function memo(type, compare) {
    if (!isValidElementType(type)) {
      error('memo1: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
    var elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
    var ownName;
    Object.defineProperty(elementType, 'displayName', {
      enumerable: false,
      configurable: true,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        if (type.displayName == null) {
          type.displayName = name;
        }
      }
    });
    return elementType;
  }
  /**
   * 获取当前触发更新的所有者
   */
  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;
    if (!(dispatcher !== null)) {
      throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
    }
    return dispatcher;
  }
  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://reactjs.org/link/rules-of-hooks' : '');
    }
    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
    return dispatcher.useContext(Context, unstable_observedBits);
  }
  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }
  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }
  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }
  function useEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }
  function useLayoutEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }
  function useCallback(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }
  function useMemo(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }
  function useImperativeHandle(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }
  function useDebugValue(value, formatterFn) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
  /**
   * 是否阻止console下的方法输出日志的flag
   */
  var disabledDepth = 0;
  /**
   * 存储浏览器提供的console下的方法
   */
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;
  function disabledLog() { }
  disabledLog.__reactDisabledLog = true;
  /**
   * 阻止console下的方法输出日志
   */
  function disableLogs() {
    if (disabledDepth === 0) {
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099
      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      };
      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
    }
    disabledDepth++;
  }
  /**
   * 解除阻止console下的方法输出日志
   */
  function reenableLogs() {
    disabledDepth--;
    if (disabledDepth === 0) {
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      };
      Object.defineProperties(console, {
        log: assign({}, props, { value: prevLog }),
        info: assign({}, props, { value: prevInfo }),
        warn: assign({}, props, { value: prevWarn }),
        error: assign({}, props, { value: prevError }),
        group: assign({}, props, { value: prevGroup }),
        groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
        groupEnd: assign({}, props, { value: prevGroupEnd })
      });
    }
    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }

  var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  /**
   * 格式化输出日志
   * eg: in Suspense1 out "\n    at Suspense1"
   */
  function describeBuiltInComponentFrame(name) {
    if (prefix === undefined) {
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    }
    return '\n' + prefix + name;
  }
  var reentry = false;
  var componentFrameCache;
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
  /**
   * TODO describeNativeComponentFrame1 获取组件的错误???
   * fn传进来的 class或者function组件
   * construct class组件的标记 为true是class组件 否则是函数式组件
   */
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) {
      return '';
    }
    var frame = componentFrameCache.get(fn);
    if (frame !== undefined) {
      return frame;
    }
    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;
    var previousDispatcher;
    previousDispatcher = ReactCurrentDispatcher$1.current;
    ReactCurrentDispatcher$1.current = null;
    disableLogs();
    try {
      if (construct) {
        // class组件
        var Fake = function () {
          throw Error();
        };
        Object.defineProperty(Fake.prototype, 'props', {
          set: function () {
            throw Error();
          }
        });
        if (typeof Reflect === 'object' && Reflect.construct) {
          try {
            Reflect.construct(Fake, []);
          } catch (x) {
            control = x;
          }

          Reflect.construct(fn, [], Fake);
        } else {
          try {
            Fake.call();
          } catch (x) {
            control = x;
          }
          fn.call(Fake.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          control = x;
        }
        fn();
      }
    } catch (sample) {
      if (sample && control && typeof sample.stack === 'string') {
        var sampleLines = sample.stack.split('\n');
        var controlLines = control.stack.split('\n');
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;
        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          c--;
        }
        for (; s >= 1 && c >= 0; s--, c--) {
          if (sampleLines[s] !== controlLines[c]) {
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--;
                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                  return _frame;
                }
              } while (s >= 1 && c >= 0);
            }
            break;
          }
        }
      }
    } finally {
      reentry = false;
      ReactCurrentDispatcher$1.current = previousDispatcher;
      reenableLogs();
      Error.prepareStackTrace = previousPrepareStackTrace;
    } // Fallback to just using the name if we couldn't make it throw.
    var name = fn ? fn.displayName || fn.name : '';
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
    return syntheticFrame;
  }
  /**
   * 函数式组件调用 describeNativeComponentFrame1 (TODO 这个方法是干嘛的)
   */
  function describeFunctionComponentFrame(fn) {
    return describeNativeComponentFrame(fn, false);
  }
  /**
   * 判断是否是class组件
   */
  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }
  /**
   * TODO describeUnknownElementTypeFrameInDEV1 dev环境下获取组件的错误????
   */
  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
    if (type == null) {
      return '';
    }
    if (typeof type === 'function') {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
    if (typeof type === 'string') {
      return describeBuiltInComponentFrame(type);
    }
    switch (type) {
      case exports.Suspense:
        return describeBuiltInComponentFrame('Suspense');
      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame('SuspenseList');
    }
    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);
        case REACT_MEMO_TYPE:
          return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn); // Memo可以接受class和function组件
        case REACT_BLOCK_TYPE:
          return describeFunctionComponentFrame(type._render);
        case REACT_LAZY_TYPE:
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;
          try {
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn); // lazy 懒加载组件可能有两种情况 class和function组件
          } catch (x) { }
      }
    }
    return '';
  }
  /**
   * 记录验证失败的消息 防止重复输出多个相同的错误验证消息
   */
  var loggedTypeFailures = {};
  var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
  /**
   * 设置当前验证的React组件
   */
  function setCurrentlyValidatingElement(element) {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
  /**
   * 验证propTypes
   * typeSpecs React组件的propTypes
   * values React组件中props中的值
   * location 'props'
   * componentName 组件name
   * element react元素
   */
  function checkPropTypes(typeSpecs, values, location, componentName, element) {
    var has = Function.call.bind(Object.prototype.hasOwnProperty);
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0;
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }
          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);
          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
          setCurrentlyValidatingElement(null);
        }
        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);
          error('Failed %s type: %s', location, error$1.message);
          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
  /**
   * 设置当前验证的React组件
   */
  function setCurrentlyValidatingElement$1(element) {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      setExtraStackFrame(stack);
    } else {
      setExtraStackFrame(null);
    }
  }
  var propTypesMisspellWarningShown = false;
  /**
   * 获取声明错误
   */
  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);
      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }
    return '';
  }
  /**
   * 获取source的错误
   */
  function getSourceInfoErrorAddendum(source) {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }
    return '';
  }
  /**
   * 获取elementProps的错误
   */
  function getSourceInfoErrorAddendumForProps(elementProps) {
    if (elementProps !== null && elementProps !== undefined) {
      return getSourceInfoErrorAddendum(elementProps.__source);
    }
    return '';
  }
  /**
   * 存储没有key的报错
   */
  var ownerHasKeyUseWarning = {};
  /**
   * 获取当前组件的错误 获取不到当前组件的错误获取父组件的
   */
  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();
    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }
    return info;
  }
  /**
   * 判断组件是不是有key 没有输出警告
   */
  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }
    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
    var childOwner = '';
    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }
    setCurrentlyValidatingElement$1(element);
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
    setCurrentlyValidatingElement$1(null);
  }
  /**
   * 验证所有children的key 如果是数组和有迭代器的类型(除了Map)调用 validateExplicitKey1
   */
  function validateChildKeys(node, parentType) {
    if (typeof node !== 'object') {
      return;
    }
    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];
        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);
      if (typeof iteratorFn === 'function') {
        if (iteratorFn !== node.entries) {// 除了Map
          var iterator = iteratorFn.call(node);
          var step;
          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  /**
   * 验证React组件的propTypes 如果组件声明了PropTypes 输出警告
   */
  function validatePropTypes(element) {
    var type = element.type;
    if (type === null || type === undefined || typeof type === 'string') { // 文字节点和原生dom节点 eg: div
      return;
    }
    var propTypes;
    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }
    if (propTypes) {
      var name = getComponentName(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;
      var _name = getComponentName(type);
      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }
    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
  /**
   * 验证React的fragment的props
   */
  function validateFragmentProps(fragment) {
    var keys = Object.keys(fragment.props);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
        setCurrentlyValidatingElement$1(null);
        break;
      }
    }
    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
      setCurrentlyValidatingElement$1(null);
    }
  }
  /**
   * 创建React元素并且验证
   */
  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type);
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }
      var sourceInfo = getSourceInfoErrorAddendumForProps(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }
      var typeString;
      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }
      error('React.createElement1: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
    var element = createElement.apply(this, arguments);
    if (element == null) {
      return element;
    }
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }
    if (type === exports.Fragment) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }
    return element;
  }
  var didWarnAboutDeprecatedCreateFactory = false;
  /**
   * React.createFactory react的组件工厂函数包含校验
   */
  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;
      warn('React.createFactory1() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement1() directly instead.');
    }
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory1.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
    return validatedFactory;
  }
  /**
   * 克隆react元素并且校验
   */
  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
  // BEGIN HERE
  var enableProfiling = false;
  var getCurrentTime = function () {
    return performance.now();
  };
  var _setTimeout = window.setTimeout;
  var _clearTimeout = window.clearTimeout;
  var isMessageLoopRunning = false;
  var scheduledHostCallback = null;
  var taskTimeoutID = -1;
  var yieldInterval = 5;
  var deadline = 0;
  var shouldYieldToHost = function () {
    return getCurrentTime() >= deadline;
  };
  var requestPaint = function () { };
  var forceFrameRate = function (fps) {
    if (fps < 0 || fps > 125) {
      console['error']('forceFrameRate1 takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
      return;
    }
    if (fps > 0) {
      yieldInterval = Math.floor(1000 / fps);
    } else {
      // reset the framerate
      yieldInterval = 5;
    }
  };
  var performWorkUntilDeadline = function () {
    if (scheduledHostCallback !== null) {
      var currentTime = getCurrentTime(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
      // cycle. This means there's always time remaining at the beginning of
      // the message event.
      deadline = currentTime + yieldInterval;
      var hasTimeRemaining = true;
      try {
        var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
        if (!hasMoreWork) {
          isMessageLoopRunning = false;
          scheduledHostCallback = null;
        } else {
          // If there's more work, schedule the next message event at the end
          // of the preceding one.
          port.postMessage(null);
        }
      } catch (error) {
        // If a scheduler task throws, exit the current browser task so the
        // error can be observed.
        port.postMessage(null);
        throw error;
      }
    } else {
      isMessageLoopRunning = false;
    } // Yielding to the browser will give it a chance to paint, so we can
  };
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;
  var requestHostCallback = function (callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
      isMessageLoopRunning = true;
      port.postMessage(null);
    }
  };
  var requestHostTimeout = function (callback, ms) {
    taskTimeoutID = _setTimeout(function () {
      callback(getCurrentTime());
    }, ms);
  };
  var cancelHostTimeout = function () {
    _clearTimeout(taskTimeoutID);
    taskTimeoutID = -1;
  };
  function push(heap, node) {
    var index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }
  function peek(heap) {
    var first = heap[0];
    return first === undefined ? null : first;
  }
  function pop(heap) {
    var first = heap[0];
    if (first !== undefined) {
      var last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }
      return first;
    } else {
      return null;
    }
  }
  function siftUp(heap, node, i) {
    var index = i;
    while (true) {
      var parentIndex = index - 1 >>> 1;
      var parent = heap[parentIndex];
      if (parent !== undefined && compare(parent, node) > 0) {
        // The parent is larger. Swap positions.
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        // The parent is smaller. Exit.
        return;
      }
    }
  }
  function siftDown(heap, node, i) {
    var index = i;
    var length = heap.length;
    while (index < length) {
      var leftIndex = (index + 1) * 2 - 1;
      var left = heap[leftIndex];
      var rightIndex = leftIndex + 1;
      var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

      if (left !== undefined && compare(left, node) < 0) {
        if (right !== undefined && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // Neither child is smaller. Exit.
        return;
      }
    }
  }
  function compare(a, b) {
    // Compare sort index first, then task id.
    var diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  }
  // TODO: Use symbols?
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;
  function markTaskErrored(task, ms) {
  }
  /* eslint-disable no-var */
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111
  var maxSigned31BitInt = 1073741823; // Times out immediately
  var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
  var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
  var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
  var taskQueue = [];
  var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
  var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
  var currentTask = null;
  var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.
  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;
  function advanceTimers(currentTime) {
    // Check for tasks that are no longer delayed and add them to the queue.
    var timer = peek(timerQueue);
    while (timer !== null) {
      if (timer.callback === null) {
        // Timer was cancelled.
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        // Timer fired. Transfer to the task queue.
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
      } else {
        // Remaining timers are pending.
        return;
      }
      timer = peek(timerQueue);
    }
  }
  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      } else {
        var firstTimer = peek(timerQueue);
        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }
  function flushWork(hasTimeRemaining, initialTime) {
    isHostCallbackScheduled = false;
    if (isHostTimeoutScheduled) {
      // We scheduled a timeout but it's no longer needed. Cancel it.
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }
    isPerformingWork = true;
    var previousPriorityLevel = currentPriorityLevel;
    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime);
        } catch (error) {
          if (currentTask !== null) {
            var currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }
          throw error;
        }
      } else {
        // No catch in prod code path.
        return workLoop(hasTimeRemaining, initialTime);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
    }
  }

  function workLoop(hasTimeRemaining, initialTime) {
    var currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);
    while (currentTask !== null) {
      if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
        // This currentTask hasn't expired, and we've reached the deadline.
        break;
      }
      var callback = currentTask.callback;
      if (typeof callback === 'function') {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
        var continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();
        if (typeof continuationCallback === 'function') {
          currentTask.callback = continuationCallback;
        } else {
          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }
        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }
      currentTask = peek(taskQueue);
    } // Return whether there's additional work
    if (currentTask !== null) {
      return true;
    } else {
      var firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
      return false;
    }
  }
  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;
      default:
        priorityLevel = NormalPriority;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }
  function unstable_next(eventHandler) {
    var priorityLevel;
    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        // Shift down to normal priority
        priorityLevel = NormalPriority;
        break;
      default:
        // Anything lower than normal priority should remain at the current level.
        priorityLevel = currentPriorityLevel;
        break;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }
  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;
      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }
  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;
    if (typeof options === 'object' && options !== null) {
      var delay = options.delay;
      if (typeof delay === 'number' && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }
    } else {
      startTime = currentTime;
    }
    var timeout;
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = IMMEDIATE_PRIORITY_TIMEOUT;
        break;
      case UserBlockingPriority:
        timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
        break;
      case IdlePriority:
        timeout = IDLE_PRIORITY_TIMEOUT;
        break;
      case LowPriority:
        timeout = LOW_PRIORITY_TIMEOUT;
        break;
      case NormalPriority:
      default:
        timeout = NORMAL_PRIORITY_TIMEOUT;
        break;
    }
    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback: callback,
      priorityLevel: priorityLevel,
      startTime: startTime,
      expirationTime: expirationTime,
      sortIndex: -1
    };
    if (startTime > currentTime) {
      // This is a delayed task.
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);
      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        // All tasks are delayed, and this is the task with the earliest delay.
        if (isHostTimeoutScheduled) {
          // Cancel an existing timeout.
          cancelHostTimeout();
        } else {
          isHostTimeoutScheduled = true;
        } // Schedule a timeout.
        requestHostTimeout(handleTimeout, startTime - currentTime);
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      // wait until the next time we yield.
      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
      }
    }
    return newTask;
  }
  function unstable_pauseExecution() {
  }
  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }
  function unstable_getFirstCallbackNode() {
    return peek(taskQueue);
  }
  function unstable_cancelCallback(task) {
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)
    task.callback = null;
  }
  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }
  var unstable_requestPaint = requestPaint;
  var unstable_Profiling = null;
  var Scheduler = /*#__PURE__*/Object.freeze({
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    get unstable_shouldYield() { return shouldYieldToHost; },
    unstable_requestPaint: unstable_requestPaint,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,
    get unstable_now() { return getCurrentTime; },
    get unstable_forceFrameRate() { return forceFrameRate; },
    unstable_Profiling: unstable_Profiling
  });
  var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.
  var interactionIDCounter = 0;
  var threadIDCounter = 0; // Set of currently traced interactions.
  // Interactions "stack"–
  // Meaning that newly traced interactions are appended to the previously active set.
  // When an interaction goes out of scope, the previous set (if any) is restored.
  var interactionsRef = null; // Listener(s) to notify when interactions begin and end.
  var subscriberRef = null;
  interactionsRef = {
    current: new Set()
  };
  subscriberRef = {
    current: null
  };
  function unstable_clear(callback) {
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();
    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }
  function unstable_getCurrent() {
    return interactionsRef.current;
  }
  function unstable_getThreadID() {
    return ++threadIDCounter;
  }
  function unstable_trace(name, timestamp, callback) {
    var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;
    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp
    };
    var prevInteractions = interactionsRef.current; // Traced interactions should stack/accumulate.
    // To do that, clone the current interactions.
    // The previous set will be restored upon completion.
    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue;
    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;
          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--; // If no async work was scheduled for this interaction,
            // Notify subscribers that it's completed.
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }
    return returnValue;
  }
  function unstable_wrap(callback) {
    var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;
    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;
    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID);
    } // Update the pending async work count for the current interactions.
    // Update after calling subscribers in case of error.
    wrappedInteractions.forEach(function (interaction) {
      interaction.__count++;
    });
    var hasRun = false;
    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;
      try {
        var returnValue;
        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments);
          } finally {
            interactionsRef.current = prevInteractions;
            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID);
            }
          }
        }
        return returnValue;
      } finally {
        if (!hasRun) {
          // We only expect a wrapped function to be executed once,
          // But in the event that it's executed more than once–
          // Only decrement the outstanding interaction counts once.
          hasRun = true; // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.
          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;
            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }
    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;
      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID);
        }
      } finally {
        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;
          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };
    return wrapped;
  }
  var subscribers = null;
  subscribers = new Set();
  function unstable_subscribe(subscriber) {
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      subscriberRef.current = {
        onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
        onInteractionTraced: onInteractionTraced,
        onWorkCanceled: onWorkCanceled,
        onWorkScheduled: onWorkScheduled,
        onWorkStarted: onWorkStarted,
        onWorkStopped: onWorkStopped
      };
    }
  }
  function unstable_unsubscribe(subscriber) {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) {
      subscriberRef.current = null;
    }
  }
  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }
  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });
    if (didCatchError) {
      throw caughtError;
    }
  }
  var SchedulerTracing = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get __interactionsRef() { return interactionsRef; },
    get __subscriberRef() { return subscriberRef; },
    unstable_clear,
    unstable_getCurrent,
    unstable_getThreadID,
    unstable_trace,
    unstable_wrap,
    unstable_subscribe,
    unstable_unsubscribe
  });
  var ReactSharedInternals$1 = {
    ReactCurrentDispatcher,
    ReactCurrentOwner,
    IsSomeRendererActing,
    ReactCurrentBatchConfig,
    assign,
    Scheduler,
    SchedulerTracing,
    ReactDebugCurrentFrame
  };
  var Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  };
  exports.Children = Children;
  exports.Component = Component;
  exports.PureComponent = PureComponent;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals$1;
  exports.cloneElement = cloneElementWithValidation;
  exports.createContext = createContext;
  exports.createElement = createElementWithValidation;
  exports.createFactory = createFactoryWithValidation;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = '17.0.2';
})));
