const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityServices');
const { getById } = require('../services/roomDatabaseServices');

const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createFacility', {
        title: 'Create new facility'
    });
});

router.post('/create', async (req, res) => {
   try {
       await createFacility(req.body.label, req.body.iconUrl);
       res.redirect('/catalog');
   } catch (error) {
       res.render('facilityCreate', {
           title: 'Create new facility'
       });

   }
});

// router.get('/:roomId/decorateRoom', async (req, res) => {
//     const roomId = req.params.roomId;
//     const room = await getById(roomId);
//     const facilities = await getAllFacilities();

//     res.render('decorate', {
//         title: 'Add facility',
//         room,
//         facilities
//     })
// });

// router.post('/:roomId/decorateRoom', async (req, res) => {
//     // pass roomId and cheked fasilities
//     await addFasilities(req.params.roomId, Object.keys(req.body))
//     res.redirect('/facility/' + req.params.roomId + '/decorateRoom')
// });


router.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    // if (!req.user || req.user._id != room.owner) {
    //     return res.redirect('/auth/login');
    // }

    const facilities = await getAllFacilities();
    facilities.forEach(f => {
        if ((room.facilities || []).some(id => id.toString() == f._id.toString())) {
            f.checked = true;
        }
    });

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities
    });
});

router.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);

    // if (!req.user || req.user._id != room.owner) {
    //     return res.redirect('/auth/login');
    // }

    await addFacilities(req.params.roomId, Object.keys(req.body));

    res.redirect('/facility/' + req.params.roomId + '/decorateRoom');
});

module.exports = router;
