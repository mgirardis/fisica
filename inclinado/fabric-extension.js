var LabeledRect = fabric.util.createClass(fabric.Rect, {
    type: 'labeledRect',
    initialize: function(options) {
        options || (options = { });
        this.callSuper('initialize', options);
        // give all labeled rectangles fixed width/height of 100/50
        this.set('width', options.width || 100);
        this.set('height', options.height || 50);
        this.set('label', options.label || '');
        this.set('labelOffset', options.labelOffset || 0);
    },
    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label')
        });
    },
    _render: function(ctx) {
        this.callSuper('_render', ctx);
        // make font and fill values of labels configurable
        ctx.font = this.fontSize + 'pt ' + this.fontFamily;
        ctx.fillStyle = this.labelFill;
        //ctx.fillText(this.label, -ctx.measureText(this.label).width/2, this.fontSize/2);
        ctx.fillText(this.label, this.labelOffset-this.width/2, this.fontSize/2);
    }
});