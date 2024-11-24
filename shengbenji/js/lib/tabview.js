// tab切换组件
(function(win, $) {
    var defaultSettings = {
        // 默认选中的tab项，从0计数
        activeIndex: 0,
        // 容器dom对象
        dom: null,
        // 触发tab切换的事件：click|mouseover
        triggerEvent: 'mouseover',
        // 高亮时的样式名
        activeCls: '',
        itemClick: null
    };

    win.TabView = function(opts) {
        this.cfg = $.extend({}, defaultSettings, opts);

        this._initView();
        this._initEvent();
    };

    $.extend(TabView.prototype, {
        _initView: function() {
            var c = this.cfg;

            var $widget = $(c.dom),

                $widgetHd = $widget.find('> [data-role="head"]'),
                $widgetBd = $widget.find('> [data-role="body"]'),

                $tabs = $widgetHd.find('[data-role="tab"]'),
                $tabCons = $widgetBd.find('> [data-role="tab-content"]'),
                $tabMores = $widgetHd.find('[data-role="more"]');

            $.extend(this, {
                $widgetHd: $widgetHd,
                $tabs: $tabs,
                $tabCons: $tabCons,
                $tabMores: $tabMores
            });

            // this.activeTabByIndex(c.activeIndex); //显示第一个tab的数据
        },

        _initEvent: function() {
            var c = this.cfg,
                triggerEvent = c.triggerEvent,

                $widgetHd = this.$widgetHd,
                self = this;

            // 用于mouseover触发时的延时
            var overTimer = 0;

            if (triggerEvent == 'click') {
                $widgetHd.on('click', '[data-role="tab"]', function(event) {
                    event.preventDefault();
                    $.proxy(self._activeTab, self, $(this))();
                });

            } else if (triggerEvent == 'mouseover') {
                $widgetHd.on('mouseover', '[data-role="tab"]', function() {
                    overTimer && clearTimeout(overTimer);

                    overTimer = setTimeout($.proxy(self._activeTab, self, $(this)), 100);

                }).on('mouseout', '[data-role="tab"]', function() {
                    overTimer && clearTimeout(overTimer);
                });
            }
        },

        _activeTab: function($tab) {
            var c = this.cfg,
                activeCls = c.activeCls;

            var $tabs = this.$tabs;

            var targetId = $tab.data('target');

            $tabs.removeClass(activeCls);
            $tab.addClass(activeCls);

            this._activeTabContent(targetId);
        },

        // 通过index激活对应tab
        activeTabByIndex: function(index) {
            var c = this.cfg,
                activeCls = c.activeCls;

            var $tabs = this.$tabs,

                $activeTab = null,
                targetId = '';

            // 若index合法
            if (index >= 0 && index < $tabs.length) {
                $activeTab = $tabs.removeClass(activeCls).eq(index).addClass(activeCls);

                targetId = $activeTab.data('target');

                this._activeTabContent(targetId);
            }
        },

        _activeTabContent: function(targetId) {
            var $tabCons = this.$tabCons,
                $tabs = this.$tabs,
                $tabMores = this.$tabMores,
                c = this.cfg;

            $tabCons.addClass('hidden')
                .filter('[data-id="' + targetId + '"]')
                .removeClass('hidden');
            $tabMores.addClass('hidden')
                .filter('[data-id="' + targetId + '"]')
                .removeClass('hidden');
            if (!!c.itemClick) {
                c.itemClick($tabs.filter('[data-target="' + targetId + '"]').index());
            }
        }
    });
}(this, jQuery));
