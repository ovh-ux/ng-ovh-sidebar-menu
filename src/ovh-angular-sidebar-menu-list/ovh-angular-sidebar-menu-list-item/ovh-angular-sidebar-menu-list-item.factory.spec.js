describe("factory: SidebarMenuListItem", function () {
    "use strict";

    var SidebarMenuListItem;

    beforeEach(module("ovh-angular-sidebar-menu"));

    beforeEach(inject(function (_SidebarMenuListItem_) {
        SidebarMenuListItem = _SidebarMenuListItem_;
    }));

    describe("Title", function () {

        it("should add prefix to title", function () {
            var factory = new SidebarMenuListItem({
                prefix: "foo",
                title: "bar"
            });
            expect(factory.getTitle().indexOf("foo")).toEqual(0);
        });
    });

    describe("Toggling", function () {

        it("should not be opened by default", function () {
            var factory = new SidebarMenuListItem();
            expect(factory.isOpen).toBe(false);
        });

        it("should not toggle with empty subItems", function () {
            var factory = new SidebarMenuListItem();
            expect(factory.isOpen).toBe(false);
            factory.toggleOpen();
            expect(factory.isOpen).toBe(false);
        });

        it("should toggle with subItems", function () {
            var factory = new SidebarMenuListItem({
                allowSubItems: true
            });
            factory.addSubItem({ foo: "bar" });
            expect(factory.isOpen).toBe(false);
            factory.toggleOpen();
            expect(factory.isOpen).toBe(true);
        });
    });

    describe("SubItems adding", function () {

        it("should be empty of subItems when created", function () {
            var factory = new SidebarMenuListItem();
            expect(factory.hasSubItems()).toBe(false);
        });

        it("should add subItems with allowSubItems enabled", function () {
            var factory = new SidebarMenuListItem({ allowSubItems: true });
            for (var i = 0; i < 42; i++) {
                factory.addSubItem({ foo: "bar" });
            }
            expect(factory.getSubItems().length).toEqual(42);
            expect(factory.hasSubItems()).toBe(true);
        });

        it("should add list of subItems with allowSubItems enabled", function () {
            var factory = new SidebarMenuListItem({ allowSubItems: true });
            var subItemsList = [];
            for (var i = 0; i < 42; i++) {
                subItemsList.push({ foo: "bar" });
            }
            factory.addSubItems(subItemsList);
            expect(factory.getSubItems().length).toEqual(42);
            expect(factory.hasSubItems()).toBe(true);
        });

        it("should not add subItems with allowSubItems disabled", function () {
            var factory = new SidebarMenuListItem({ allowSubItems: false });
            for (var i = 0; i < 5; i++) {
                factory.addSubItem({ foo: "bar" });
            }
            expect(factory.subItems.length).toEqual(0);
            expect(factory.hasSubItems()).toBe(false);
        });

        it("should not add list of subItems with allowSubItems disabled", function () {
            var factory = new SidebarMenuListItem({ allowSubItems: false });
            var subItemsList = [];
            for (var i = 0; i < 42; i++) {
                subItemsList.push({ foo: "bar" });
            }
            factory.addSubItems(subItemsList);
            expect(factory.subItems.length).toEqual(0);
            expect(factory.hasSubItems()).toBe(false);
        });
    });

    describe("SubItems loading", function () {

        var $q;
        var $timeout;

        beforeEach(inject(function (_$q_, _$timeout_) {
            $q = _$q_;
            $timeout = _$timeout_;
        }));

        it("should load subItems", function () {
            var resolvedResult = null;
            var subItems = ["foo", "bar"];
            var factory = new SidebarMenuListItem({
                allowSubItems: true,
                onLoad: function () {
                    return $q.when(subItems);
                }
            });
            var promise = factory.loadSubItems();
            promise.then(function (result) {
                resolvedResult = result;
            });
            $timeout.flush();
            expect(resolvedResult).toEqual(subItems);
        });

        it("should not load subItems if loading is pending", function () {
            var resolvedResult1 = null;
            var resolvedResult2 = null;
            var subItems = ["foo", "bar"];
            var factory = new SidebarMenuListItem({
                allowSubItems: true,
                onLoad: function () {
                    var deferred = $q.defer();
                    deferred.resolve(subItems);
                    return deferred.promise;
                }
            });
            var promise1 = factory.loadSubItems();
            promise1.then(function (result) {
                resolvedResult1 = result;
            });
            var promise2 = factory.loadSubItems();
            promise2.then(function (result) {
                resolvedResult2 = result;
            });
            $timeout.flush();
            expect(resolvedResult1).toEqual(subItems);
            expect(resolvedResult2).toEqual([]);
        });
    });

    describe("SubItems searching", function () {

        it("should use id as searchProperty by default", function () {
            var factory = new SidebarMenuListItem({
                id: "hello"                
            });
            expect(factory.searchProperties).toEqual(["id"]);
        });

        it("should use id and title as searchProperties if title is defined", function () {
            var factory = new SidebarMenuListItem({
                id: "hello",
                title: "world"
            });
            expect(factory.searchProperties).toEqual(["id", "title"]);
        });

        it("should add search property", function () {
            var factory = new SidebarMenuListItem({
                id: "hello"
            });
            expect(factory.searchProperties).toEqual(["id"]);
            factory.addSearchProperty("title");
            expect(factory.searchProperties).toEqual(["id", "title"]);
        });

        it("should use nothing as searchKey by default", function () {
            var factory = new SidebarMenuListItem({
                id: "hello",
                title: "world"
            });

            expect(factory.searchKey).toEqual([]);
        });

        it("should add search key and ignore case", function () {
            var factory = new SidebarMenuListItem({
                id: "hello"
            });
            factory.addSearchKey("  FoO   ");
            expect(factory.searchKey).toContain("foo");
        });

        it("should add multiple search key and ignore case", function () {
            var factory = new SidebarMenuListItem({
                id: "hello"
            });
            factory.addSearchKey("  Foo");
            factory.addSearchKey("Bar   ");
            expect(factory.searchKey).toContain("foo");
            expect(factory.searchKey).toContain("bar");
        });

        describe('Filter sub items', function () {

            var root;
            var child1;
            var child2;
            var child1A;
            var child2A;

            beforeEach(function () {

                root = new SidebarMenuListItem({
                    id: "root",
                    allowSearch: true,
                    allowSubItems: true
                });
                child1 = root.addSubItem({
                    id: "child1",
                    allowSubItems: true
                });
                child2 = root.addSubItem({
                    id: "child2",
                    allowSubItems: true
                });
                child1A = child1.addSubItem({
                    id: "child1A"
                });
                child2A = child2.addSubItem({
                    id: "child2A",
                    title: "Alicorn"
                });

                expect(root.getSubItems().length).toEqual(2);
                expect(root.getSubItems()[0]).toEqual(child1);
                expect(root.getSubItems()[1]).toEqual(child2);

                expect(root.getSubItems()[0].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0].getSubItems()[0]).toEqual(child1A);
                expect(root.getSubItems()[1].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[1].getSubItems()[0]).toEqual(child2A);
            });

            afterEach(function () {

                root.filterSubItems("");

                expect(root.getSubItems().length).toEqual(2);
                expect(root.getSubItems()[0]).toEqual(child1);
                expect(root.getSubItems()[1]).toEqual(child2);
            });

            it("should filter on id", function () {

                root.filterSubItems("child2A");

                expect(root.getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0]).toEqual(child2);
            });

            it("should filter on integer id", function () {

                child2A.id = 314159265359;
                root.filterSubItems("314"); 

                expect(root.getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0]).toEqual(child2);
            });

            it("should filter on title", function () {

                root.filterSubItems("ali");
                expect(root.getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0]).toEqual(child2);
                expect(root.getSubItems()[0].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0].getSubItems()[0]).toEqual(child2A);
            });

            it("should filter on searchKey", function () {

                child1A.addSearchKey("unicorn");
                root.filterSubItems("uni");

                expect(root.getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0].id).toEqual(child1.id);
                expect(root.getSubItems()[0].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0].getSubItems()[0].id).toEqual(child1A.id);
            });

            it("should filter on searchProperties and searchKey", function () {

                child1A.addSearchKey("unicorn");
                root.filterSubItems("corn");

                expect(root.getSubItems().length).toEqual(2);
                expect(root.getSubItems()[0].id).toEqual(child1.id);
                expect(root.getSubItems()[0].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[0].getSubItems()[0].id).toEqual(child1A.id);
                expect(root.getSubItems()[1].id).toEqual(child2.id);
                expect(root.getSubItems()[1].getSubItems().length).toEqual(1);
                expect(root.getSubItems()[1].getSubItems()[0].id).toEqual(child2A.id);
            });
        });

        it("should not search item with searchable set to false", function () {
            var root = new SidebarMenuListItem({
                id: "root",
                allowSearch: true,
                allowSubItems: true
            });
            root.addSubItem({
                id: "hello",
                title: "world",
                searchable: false
            });
            root.addSubItem({
                id: "hi",
                title: "world"
            });
            root.filterSubItems("world");
            expect(root.getSubItems().length).toEqual(1);
        });
    });
});
