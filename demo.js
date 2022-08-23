 
        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

        var tabs = [{
            id: 1,
            name: "WISMO",
            items: [{
                id: 1,
                tabid: 1,
                title: "Tab one course one",
                content: ""
            }, {
                id: 2,
                tabid: 1,
                title: "Tab one course two",
                content: ""
            }, {
                id: 3,
                tabid: 1,
                title: "Tab one course Three",
                content: ""
            }, {
                id: 4,
                tabid: 1,
                title: "Tab one course four",
                content: ""
            }, {
                id: 5,
                tabid: 1,
                title: "Tab one course five",
                content: ""
            }, {
                id: 6,
                tabid: 1,
                title: "Tab one course six",
                content: ""
            }, {
                id: 7,
                tabid: 1,
                title: "Tab one course seven",
                content: ""
            }, {
                id: 8,
                tabid: 1,
                title: "Tab one course eight",
                content: ""
            }]
        }];
        var allItems = [];
        var searchedItemsList = [];
        var searchedTabs = [];
        var isSearched = false;
        function getTabsHeaders(tabsHeaders) {
            var headers = '';
            tabsHeaders.forEach(function (tabElement, tabElementIndex) {
                if (tabElement.items.length > 0) {
                    allItems.push(tabElement.items);
                }
                headers += "<a href=\"javascript:void(0)\" data-id=\"" + tabElement.id + "\" data-tab=\"" + tabElement.name + "\" class=\"tab-nav btn-all-c  " + (tabElementIndex == 0 ? 'active' : '') + " \">\n                    " + tabElement.name + "\n                </a>";
            });
            return headers;
        }
        function renderChildItem(item) {
            return "<div class=\"item-course\">\n                                <a href=\"#\">\n                                    <div class=\"content\">\n                                        <h6>" + item.title + "</h6>\n                                    </div>\n                            </a>\n                        </div>";
        }
        function split(array, n) {
            var _array = _toArray(array);

            var arr = _array;

            var res = [];
            while (arr.length) {
                res.push(arr.splice(0, n));
            }
            return res;
        }
        function chunkArray(arr, n) {
            var chunkLength = Math.max(arr.length / n, 1);
            var chunks = [];
            for (var i = 0; i < n; i++) {
                if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
            }
            return chunks;
        }
        function transform(array) {
            return array.reduce(function (result, item, index) {
                return index % 3 ? result : new Array().concat(_toConsumableArray(result), [[item, array[index + 1], array[index + 2]]]);
            }, new Array());
        }
        function renderTabData(tabBody) {
            var tabContent = '';
            var tmpItems = [];
            tabBody.forEach(function (element) {
                tmpItems.push(element.items);
            });
            console.log("chunkArray", transform(tmpItems.flat()));

            var items = tmpItems.flat();
            items.forEach(function (tabElementItem, tabElementItemIndex) {
                var getLength = tabs.filter(function (f) {
                    return f.id == tabElementItem.tabid;
                });
                console.log("getLength", getLength[0].items);
                if (getLength[0].items.length > 4) {
                    if (tabElementItemIndex % 2 == 0) {
                        tabContent += "<div class=\"item aval-c-item card\" data-key=\"" + tabElementItem.tabid + "\">";
                    }
                    tabContent += renderChildItem(tabElementItem) + " ";
                    if (tabElementItemIndex % 2 == 1) {
                        tabContent += "</div>";
                    }
                } else {
                    tabContent += "<div class=\"item aval-c-item card\" data-key=\"" + tabElementItem.tabid + "\">";
                    tabContent += renderChildItem(tabElementItem) + " ";
                    tabContent += "</div>";
                }
            });
            return tabContent;
        }
        function prepareDatawithTabs(data) {
            var html = "<div class=\"panel panel-default available-courses-section\" >\n            <div class=\"panel-body\">\n                <h4>Available Courses</h4>\n                <div class=\"tabs\">\n                    <div class=\"tabs-nav\" id=\"tabheaders\">\n                        " + getTabsHeaders(data) + "\n                    </div>\n                    <div class=\"AvailableCarousel\" data-items=\"3,3,3,3\" data-slide=\"1\" id=\"AvailableCarousel\"  data-interval=\"1000\">\n                        <div class=\"AvailableCarousel-inner\">\n                            " + renderTabData(data) + "\n                        </div>\n                        <button class=\"btn btn-primary leftLst\"><</button>\n                        <button class=\"btn btn-primary rightLst\">></button>\n                    </div>\n                </div>\n                </div>\n            </div> ";
            // document.getElementById('dynamic_html_data').innerHTML = html
            $('#dynamic_html_data').empty().append(html);
        }
        function initSlider() {
            $('#custom-carousel-content').carousel();
            var checkitemExtContent = function checkitemExtContent() {
                var $this;
                $this = $("#custom-carousel-content");
                if ($('#custom-carousel-content .carousel-inner').find('.item').length == 1) {
                    $this.children(".left").hide();
                    $this.children(".right").hide();
                } else if ($("#custom-carousel-content .carousel-inner .item:first").hasClass("active")) {
                    $this.children(".left").hide();
                    $this.children(".right").show();
                } else if ($("#custom-carousel-content .carousel-inner .item:last").hasClass("active")) {
                    $this.children(".right").hide();
                    $this.children(".left").show();
                } else {
                    $this.children(".carousel-control").show();
                }
            };
            checkitemExtContent();
            $("#custom-carousel-content").on("slid.bs.carousel", "", checkitemExtContent);
        }
        $(document).ready(function () {
            initPage();
        });
        function initPage() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? tabs : arguments[0];

            prepareDatawithTabs(data);
            initFirstTab();
        }
        function initFirstTab() {
            var element = $("#tabheaders .active").data('id');
            var faqCard = $('.aval-c-item');
            $('.aval-c-item').hide();
            $(`.aval-c-item[data-key='${element}']`).show();
        }

        $(document).on("keydown", "#search", function () {
            if ($('#search').val() != '') {
                $('#clear-search').addClass('clear-search-btn');
            }
        });
        $(document).on("change", "#search", function () {
            var value = $(this).val();
            if (value != '') {
                $('#clear-search').removeClass('clear-search-btn');
                if (allItems.flat().length > 0) {
                    (function () {
                        var filteredList = allItems.flat().filter(function (item, itemIndex) {
                            return item.title.toLowerCase().trim().includes(value.toLowerCase().trim());
                        });
                        var includedTabsList = [].concat(_toConsumableArray(new Set(filteredList.filter(function (f) {
                            return f.tabid;
                        }).map(function (filteredObj) {
                            return filteredObj.tabid;
                        }))));
                        console.log("includedTabsList", includedTabsList);
                        console.log("filteredList", filteredList);
                        var f = tabs.filter(function (f) {
                            return includedTabsList.includes(f.id);
                        });
                        console.log("f", f);
                        var finalTabs = new Array();
                        if (f.length > 0) {
                            f.forEach(function (element, index) {
                                var filteredList = element.items.filter(function (item, itemIndex) {
                                    return item.title.toLowerCase().trim().includes(value.toLowerCase().trim());
                                });
                                if (filteredList.length > 0) {
                                    f[index]['items'] = filteredList;
                                }
                            });
                        }
                        initPage(f);
                    })();
                }
            } else {
                $('#clear-search').addClass('clear-search-btn');
                initPage();
            }
        });
        $(document).on("click", ".btn-all-c", function () {
            $('.btn-all-c').removeClass('active');
            $(this).addClass('active');
            var cardKey = $(this).data('id');
            var faqCard = $('.aval-c-item');
            $('.aval-c-item').hide();
            $('.aval-c-item[data-key="' + cardKey + '"]').show();
        });
        $(document).on('click', '#clear-search', function () {
            $(this).toggleClass('clear-search-btn');
            initPage();
        });
        window.addEventListener('load', function () { });
        $(document).ready(function () {
            var itemsMainDiv = '.AvailableCarousel';
            var itemsDiv = '.AvailableCarousel-inner';
            var itemWidth = "";
            $('.leftLst, .rightLst').click(function () {
                var condition = $(this).hasClass("leftLst");
                if (condition) click(0, this); else click(1, this);
            });
            ResCarouselSize();
            $(window).resize(function () {
                ResCarouselSize();
            });
            //this function define the size of the items
            function ResCarouselSize() {
                var incno = 0;
                var dataItems = "data-items";
                var itemClass = '.item';
                var id = 0;
                var btnParentSb = '';
                var itemsSplit = '';
                var sampwidth = $(itemsMainDiv).width();
                var bodyWidth = $('body').width();
                $(itemsDiv).each(function () {
                    id = id + 1;
                    var itemNumbers = $(this).find(itemClass).length;
                    btnParentSb = $(this).parent().attr(dataItems);
                    itemsSplit = btnParentSb.split(',');
                    $(this).parent().attr("id", "AvailableCarousel" + id);
                    if (bodyWidth >= 1200) {
                        incno = itemsSplit[3];
                        itemWidth = sampwidth / incno;
                    } else if (bodyWidth >= 992) {
                        incno = itemsSplit[2];
                        itemWidth = sampwidth / incno;
                    } else if (bodyWidth >= 768) {
                        incno = itemsSplit[1];
                        itemWidth = sampwidth / incno;
                    } else {
                        incno = itemsSplit[0];
                        itemWidth = sampwidth / incno;
                    }
                    $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
                    $(this).find(itemClass).each(function () {
                        $(this).outerWidth(itemWidth);
                    });
                    $(".leftLst").addClass("over");
                    $(".rightLst").removeClass("over");
                });
            }
            //this function used to move the items
            function ResCarousel(e, el, s) {
                var leftBtn = '.leftLst';
                var rightBtn = '.rightLst';
                var translateXval = '';
                var divStyle = $(el + ' ' + itemsDiv).css('transform');
                var values = divStyle.match(/-?[\d\.]+/g);
                var xds = Math.abs(values[4]);
                if (e == 0) {
                    translateXval = parseInt(xds) - parseInt(itemWidth * s);
                    $(el + ' ' + rightBtn).removeClass("over");
                    if (translateXval <= itemWidth / 2) {
                        translateXval = 0;
                        $(el + ' ' + leftBtn).addClass("over");
                    }
                } else if (e == 1) {
                    var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
                    translateXval = parseInt(xds) + parseInt(itemWidth * s);
                    $(el + ' ' + leftBtn).removeClass("over");
                    if (translateXval >= itemsCondition - itemWidth / 2) {
                        translateXval = itemsCondition;
                        $(el + ' ' + rightBtn).addClass("over");
                    }
                }
                $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
            }
            //It is used to get some elements from btn
            function click(ell, ee) {
                var Parent = "#" + $(ee).parent().attr("id");
                var slide = $(Parent).attr("data-slide");
                ResCarousel(ell, Parent, slide);
            }
        });
     
