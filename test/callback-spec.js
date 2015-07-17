/**
 * Created by n.atlas on 17/7/2015.
 */
describe('Callback Module', function() {

// necessary
  it('exists on the window', function() {
    expect(window.CallbackJS).toBeDefined();
    expect(typeof window.CallbackJS).toBe("function");
  });
  it('should create a singleton and not recreate', function() {
    var ones = window.CallbackJS("id1");
    var res = "";
    ones.add("key", function () {
        res = "done";
    });
    var two = window.CallbackJS("id1");
    two.execute("key");
    expect(res).toBe("done");
  });
  it('should create a simple callback', function() {
    var ones = window.CallbackJS("id1");
    var res = "";
    ones.add("key", function () {
      res = "done";
    });
    ones.execute("key")
    expect(res).toBe("done");
  });
  it('should add multiple functions under the same key', function() {
    var ones = window.CallbackJS("id1");
    var res = "",res1="",res2="";
    ones.add("key", function () {
      res = "done";
      res1 = "done1"
    });
    ones.add("key", function () {
      res = "doneOverride";
      res2 = "done2";
    });
    ones.execute("key")
    expect(res).toBe("doneOverride");
    expect(res1).toBe("done1");
    expect(res2).toBe("done2");
  });

  it('should override old functions if the code is the same', function() {
    var ones = window.CallbackJS("id1");
    var res = "",res1="",res2="";
    ones.add("key", function () {
      res = "done";
      res1 = "done1"
    }, "code"); // code
    ones.add("key", function () {
      res = "doneOverride";
      res2 = "done2";
    }, "code");
    ones.execute("key")
    expect(res).toBe("doneOverride");
    expect(res1).toBe(""); // first Callback will not run!
    expect(res2).toBe("done2");
  });
});
