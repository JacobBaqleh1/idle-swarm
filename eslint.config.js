const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/', 'coverage/'],
  },
  // Game source files — browser globals + cross-file game globals
  {
    files: ['js/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        // CommonJS export guard used in every file
        module: 'readonly',
        // Cross-file game globals (loaded via ordered <script> tags)
        state:               'readonly',
        RESOURCE_DEFS:       'readonly',
        UNIT_LABELS:         'readonly',
        UNIT_COSTS:          'readonly',
        UNIT_PRODUCTION:     'readonly',
        getUnitCost:         'readonly',
        canAfford:           'readonly',
        buyUnit:             'readonly',
        isResourceVisible:   'readonly',
        formatNumber:        'readonly',
        formatCostString:    'readonly',
        render:              'readonly',
        saveGame:            'readonly',
        loadGame:            'readonly',
        resetGame:           'readonly',
        gameTick:            'readonly',
        initTabs:            'readonly',
        switchTab:           'readonly',
        updateTabVisibility: 'readonly',
        initUnitBuyButtons:  'readonly',
        initClickForFood:    'readonly',
      },
    },
    rules: {
      'no-undef':       'error',
      'eqeqeq':         'error',
      'no-var':         'error',
      'prefer-const':   'error',
      'no-unused-vars': 'warn',
    },
  },
  // Test files — Node + Jest globals
  {
    files: ['js/__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'no-undef':       'error',
      'eqeqeq':         'error',
      'no-var':         'error',
      'prefer-const':   'error',
      'no-unused-vars': 'warn',
    },
  },
];
