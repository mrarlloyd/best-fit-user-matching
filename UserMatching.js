const primaryUser = {
  _id: '123',
  categories: [
    'first', 'second'
  ],
  tags: [
    'foo', 'bar'
  ],
  promotedUser: false
};

const userArray = [
  {
    _id: '123',
    categories: [
      'first', 'second'
    ],
    tags: [
      'foo', 'bar'
    ],
    promotedUser: false
  }, {
    _id: '456',
    categories: [
      'third', 'fourth'
    ],
    tags: ['bar'],
    promotedUser: false
  }, {
    _id: '789',
    categories: [
      'first', 'third'
    ],
    tags: ['foo'],
    promotedUser: false
  }, {
    _id: '101112',
    categories: [
      'fourth', 'second', 'first'
    ],
    tags: ['something else'],
    promotedUser: false
  }, {
    _id: '131415',
    categories: [],
    tags: [],
    promotedUser: false
  }, {
    _id: '151617',
    categories: [
      'third', 'fourth'
    ],
    tags: [
      'foo', 'bar'
    ],
    promotedUser: false
  }, {
    _id: '789',
    categories: [
      'first', 'second'
    ],
    tags: [],
    promotedUser: false
  }
];

const bestMatch = userArray.map(currentUser => {
  let score = 0;
  const keysToCheckAgainst = [
    {
      keys: [
        'tags', 'categories'
      ],
      fn: ( primary, current ) => {
        let thisScore = 0;
        for ( let currentTagOrCategory in current ) {
          if (primary[currentTagOrCategory] === current[currentTagOrCategory]) {
            thisScore += 1;
          }

        }
        return thisScore;

      }
    }, {
      keys: ['promotedUser'],
      fn: ( primary, current ) => ( current
        ? 100
        : 0 )
    }

  ];

  if ( currentUser._id !== primaryUser._id ) { // make sure we 'exlude' an exact match
    keysToCheckAgainst.forEach(currentSubType => {
      currentSubType.keys.forEach(matches => {
        score += currentSubType.fn(primaryUser[matches], currentUser[matches]);
      });
    });
    return { score: score, _id: currentUser._id };
  } else {
    return { score: -1, _id: currentUser._id };
  }
});

bestMatch.sort(( a, b ) => ( b.score - a.score ));
