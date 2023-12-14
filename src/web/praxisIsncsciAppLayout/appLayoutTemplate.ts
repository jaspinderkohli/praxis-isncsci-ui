const getAppBarTemplate = (iconsPath: string) => {
  return `
    <praxis-isncsci-app-bar slot="app-bar">
      <button class="button icon-button" slot="menu-button">
        <praxis-isncsci-icon
          href="${iconsPath}/regular.svg#icon-hamburger-menu-24"
          size="24"
        ></praxis-isncsci-icon>
      </button>
      <span slot="title">&nbsp;</span>
      <div slot="actions">
        <button class="button" action-calculate>
          <praxis-isncsci-icon
            href="${iconsPath}/regular.svg#icon-calculator-20"
            size="20"
          ></praxis-isncsci-icon>
          Calculate
        </button>
      </div>
    </praxis-isncsci-app-bar>
  `;
};

export const getInputLayoutTemplate = (): string => {
  return `
    <praxis-isncsci-input-layout slot="input-layout">
      <div slot="vac" class="anal-function right">
          <label for="vac"><span class="intermittent">(</span>VAC<span class="intermittent">) Voluntary anal contraction</span></label>
          <select name="vac" id="vac">
            <option value="None"></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="NT">NT</option>
          </select>
      </div>
      <div slot="dap" class="anal-function">
        <select name="dap" id="dap">
          <option value=""></option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="nt">NT</option>
        </select>
        <label for="dap"><span class="intermittent">(</span>DAP<span class="intermittent">) Deep anal pressure</span></label>
      </div>
      <div slot="non-key-muscles-header">
        Lowest non-key muscle with motor function
      </div>
      <label for="right-lowest" slot="right-lowest-label">Right:</label>
      <select name="right-lowest" id="right-lowest" slot="right-lowest">
        <option value="None"></option>
        <option value="C5">C5 - Shoulder: Flexion, extension, abduction, adduction, internal and external rotation - Elbow: Supination</option>
        <option value="C6">C6 - Elbow: Pronation - Wrist: Flexion</option>
        <option value="C7">C7 - Finger: Flexion at proximal joint, extension. Thumb: Flexion, extension and abduction in plane of thumb</option>
        <option value="C8">C8 - Finger: Flexion at MCP joint Thumb: Opposition, adduction and abduction perpendicular to palm</option>
        <option value="T1">T1 - Finger: Abduction of the index finger</option>
        <option value="L2">L2 - Hip: Adduction</option>
        <option value="L3">L3 - Hip: External rotation</option>
        <option value="L4">L4 - Hip: Extension, abduction, internal rotation - Knee: Flexion - Ankle: Inversion and eversion - Toe: MP and IP extension</option>
        <option value="L5">L5 - Hallux and Toe: DIP and PIP flexion and abduction</option>
        <option value="S1">S1 - Hallux: Adduction</option>
      </select>
      <label for="left-lowest" slot="left-lowest-label">Left:</label>
      <select name="left-lowest" id="left-lowest" slot="left-lowest">
        <option value="None"></option>
        <option value="C5">C5 - Shoulder: Flexion, extension, abduction, adduction, internal and external rotation - Elbow: Supination</option>
        <option value="C6">C6 - Elbow: Pronation - Wrist: Flexion</option>
        <option value="C7">C7 - Finger: Flexion at proximal joint, extension. Thumb: Flexion, extension and abduction in plane of thumb</option>
        <option value="C8">C8 - Finger: Flexion at MCP joint Thumb: Opposition, adduction and abduction perpendicular to palm</option>
        <option value="T1">T1 - Finger: Abduction of the index finger</option>
        <option value="L2">L2 - Hip: Adduction</option>
        <option value="L3">L3 - Hip: External rotation</option>
        <option value="L4">L4 - Hip: Extension, abduction, internal rotation - Knee: Flexion - Ankle: Inversion and eversion - Toe: MP and IP extension</option>
        <option value="L5">L5 - Hallux and Toe: DIP and PIP flexion and abduction</option>
        <option value="S1">S1 - Hallux: Adduction</option>
      </select>
      <label for="comments" slot="comments-label">Comments:</label>
      <textarea name="comments" id="comments" slot="comments"></textarea>
    </praxis-isncsci-input-layout>
  `;
};

const getClassificationTemplate = (iconsPath: string) => {
  return `
    <praxis-isncsci-classification slot="classification">
      <praxis-isncsci-dialog-header slot="header">
        <h2 slot="title">Classification</h2>
        <div slot="close">
          <button class="button icon-button" action-close-classification>
            <praxis-isncsci-icon
              href="${iconsPath}/regular.svg#icon-close-24"
              size="24"
            ></praxis-isncsci-icon>
          </button>
        </div>
      </praxis-isncsci-dialog-header>
      <!-- Neurological levels -->
      <praxis-isncsci-classification-grid
        slot="neurological-levels"
        class="classification-grid"
      >
        <h3 slot="heading">Neurological levels</h3>
        <div slot="grid">
          <div>&nbsp;</div>
          <div class="text-caption-2 col-header">R</div>
          <div class="text-caption-2 col-header">L</div>
          <div class="text-caption-2 row-header">Sensory</div>
          <praxis-isncsci-classification-total data-total="right-sensory"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-sensory"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <div class="text-caption-2 row-header">Motor</div>
          <praxis-isncsci-classification-total data-total="right-motor"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-motor"
            >&nbsp;</praxis-isncsci-classification-total
          >
        </div>
      </praxis-isncsci-classification-grid>
      <!-- NLI -->
      <praxis-isncsci-classification-grid slot="nli">
        <h3 slot="heading">Neurological Level of Injury<br />(NLI)</h3>
        <div slot="grid">
          <praxis-isncsci-classification-total data-total="neurological-level-of-injury"
            >&nbsp;</praxis-isncsci-classification-total
          >
        </div>
      </praxis-isncsci-classification-grid>
      <!-- AIS -->
      <praxis-isncsci-classification-grid slot="ais">
        <h3 slot="heading">Asia Impairment Scale<br />(AIS)</h3>
        <div slot="grid">
          <praxis-isncsci-classification-total data-total="asia-impairment-scale"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="injury-complete"
            >&nbsp;</praxis-isncsci-classification-total
          >
        </div>
      </praxis-isncsci-classification-grid>
      <!-- ZPP -->
      <praxis-isncsci-classification-grid slot="zpp">
        <h3 slot="heading">Zone of partial preservation</h3>
        <div slot="grid">
          <div>&nbsp;</div>
          <div class="text-caption-2 col-header">R</div>
          <div class="text-caption-2 col-header">L</div>
          <div class="text-caption-2 row-header">Sensory</div>
          <praxis-isncsci-classification-total data-total="right-sensory-zpp"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-sensory-zpp"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <div class="text-caption-2 row-header">Motor</div>
          <praxis-isncsci-classification-total data-total="right-motor-zpp"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-motor-zpp"
            >&nbsp;</praxis-isncsci-classification-total
          >
        </div>
      </praxis-isncsci-classification-grid>
      <!-- Sub-scores -->
      <praxis-isncsci-classification-grid slot="sub-scores">
        <h3 slot="heading">Sub-scores</h3>
        <div slot="grid">
          <div>&nbsp;</div>
          <div class="text-caption-2 col-header">R</div>
          <div class="text-caption-2 col-header">L</div>
          <div class="text-caption-2 col-header">Total</div>
          <div class="text-caption-2 row-header">UEMS</div>
          <praxis-isncsci-classification-total data-total="right-upper-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-upper-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="upper-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <div class="text-caption-2 row-header">LEMS</div>
          <praxis-isncsci-classification-total data-total="right-lower-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-lower-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="lower-motor-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <div class="text-caption-2 row-header">Light touch</div>
          <praxis-isncsci-classification-total data-total="right-light-touch-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-light-touch-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="touch-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <div class="text-caption-2 row-header">Pin prick</div>
          <praxis-isncsci-classification-total data-total="right-pin-prick-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="left-pin-prick-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
          <praxis-isncsci-classification-total data-total="pin-prick-total"
            >&nbsp;</praxis-isncsci-classification-total
          >
        </div>
      </praxis-isncsci-classification-grid>
    </praxis-isncsci-classification>
  `;
};

export const getAppLayoutTemplate = (
  classificationStyle: '' | 'visible' | 'static',
  iconsPath: string,
): string => {
  return `
    <praxis-isncsci-app-layout classification-style="${classificationStyle}">
      ${getAppBarTemplate(iconsPath)}
      ${getInputLayoutTemplate()}
      <praxis-isncsci-input slot="input-controls" disabled></praxis-isncsci-input>
      ${getClassificationTemplate(iconsPath)}
    </praxis-isncsci-app-layout>
  `;
};
