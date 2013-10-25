var activitiesModel = (function () {
    var activityModel = {
        id: 'Id',
        fields: {
            Text: {
                field: 'Text',
                defaultValue: ''
            },
            CreatedAt: {
                field: 'CreatedAt',
                defaultValue: new Date()
            },
            Picture: {
                fields: 'Picture',
                defaultValue: ''
            },
            UserId: {
                field: 'UserId',
                defaultValue: ''
            },
            Likes: {
                field: 'Likes',
                defaultValue: []
            }
        },
        CreatedAtFormatted: function () {
            return app.AppHelper.formatDate(this.get('CreatedAt'));
        },
        PictureUrl: function () {
            return app.AppHelper.resolvePictureUrl(this.get('Picture'));
        },
        User: function () {
            var userId = this.get('UserId');
            var user = $.grep(usersModel.users(), function (e) {
                return e.Id === userId;
            })[0];
            return user ? {
                DisplayName: user.DisplayName,
                PictureUrl: app.AppHelper.resolveProfilePictureUrl(user.Picture)
            } : {
                DisplayName: 'Anonymous',
                PictureUrl: app.AppHelper.resolveProfilePictureUrl()
            };
        }
    };
    var activitiesDataSource = new kendo.data.DataSource({
        type: 'everlive',
        schema: {
            model: activityModel
        },
        transport: {
            // required by Everlive
            typeName: 'Activities'
        },
        change: function (e) {
            if (e.items && e.items.length > 0) {
                $('#no-activities-span').hide();
            }
            else {
                $('#no-activities-span').show();
            }
        },
        sort: { field: 'CreatedAt', dir: 'desc' }
    });
    return {
        activities: activitiesDataSource
    };
}());
