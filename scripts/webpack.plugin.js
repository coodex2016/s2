exports.default ={
  pre(cfg) {  },
  config(cfg) {
      // 替换build入口
    cfg.entry.main = [ `src/products/${process.env.apps}/main.ts`];
    return cfg;
  },
  post() {  }
};

