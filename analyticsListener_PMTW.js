(function() {
    return (function() {
        $A.componentService.addComponentClass("markup://forceCommunity:analyticsListener",
            function() {
                return {
                    meta: {
                        name: "forceCommunity$analyticsListener",
                        "extends": "markup://aura:component"
                    },
                    controller: {
                        doInit: function(b, a, f) {
                            a = b.get("v.trackerId");
                            var k = b.get("v.userId"),
                                d = b.get("v.networkUserType"),
                                l = b.get("v.isUserAllowAccessOfSalesforceDataToGA");
                            (function(a, b, d, g, c, e, h) {
                                a.GoogleAnalyticsObject = c;
                                a[c] = a[c] || function() {
                                    (a[c].q = a[c].q || []).push(arguments)
                                };
                                a[c].l = 1 * new Date;
                                e = b.createElement(d);
                                h = b.getElementsByTagName(d)[0];
                                e.async = 1;
                                e.src = g;
                                h.parentNode.insertBefore(e, h)
                            })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
                            ga("create", a, "auto");
                            document.body.addEventListener("routeChangeSuccess", function(a, b) {
                                var f = location.pathname,
                                    g = document.title,
                                    c = a.detail.routeParams.entity_name;
                                d = "Undefined" == d ? $A.get("$Label.NetworksGoogleAnalytics.networkGuestUserType") : d;
                                c = c ? c : $A.get("$Label.NetworksGoogleAnalytics.genericBucketToGroupPageView");
                                l && (ga("set", "userId", k), ga("set", "dimension1", d), ga("set",
                                    "dimension2", c), ga("set", "dimension3", k));
                                ga("set", {
                                    page: f,
                                    title: g
                                });
                                ga("send", "pageview")
                            })
                        },
                        handleEvent: function(b, a, f) {
                            b = b.get("v.isUserAllowAccessOfSalesforceDataToGA");
                            a = a.getParams();
                            "exception" === a.hitType ? (delete a.hitType, ga("send", "exception", a)) : (!a.isEventContainsUserSalesforceData || a.isEventContainsUserSalesforceData && b) && ga("send", a)
                        }
                    }
                }
            });
        return {
            "xs": "I",
            "descriptor": "markup://forceCommunity:analyticsListener",
            "superDef": {
                "descriptor": "markup://aura:component"
            },
            "isCSSPreloaded": true,
            "attributeDefs": [{
                "name": "body",
                "type": "aura://Aura.Component[]",
                "xs": "G"
            }, {
                "name": "trackerId",
                "type": "aura://String",
                "xs": "I"
            }, {
                "name": "userId",
                "type": "aura://String",
                "xs": "I"
            }, {
                "name": "networkUserType",
                "type": "aura://String",
                "xs": "I"
            }, {
                "name": "isUserAllowAccessOfSalesforceDataToGA",
                "type": "aura://Boolean",
                "xs": "I"
            }],
            "interfaces": ["markup://siteforce:availableForSiteDotCom"],
            "handlerDefs": [{
                "action": "{!c.doInit}",
                "value": "{!this}",
                "name": "init"
            }, {
                "eventDef": {
                    "descriptor": "markup://forceCommunity:analyticsInteraction"
                },
                "action": "{!c.handleEvent}"
            }]
        };
    });
})();