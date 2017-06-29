class SearchBar {
  constructor(callback) {
    this.template = `
      <div class="search-bar-wrapper">
        <input type="text" placeholder="Search mini map" class="input-text-bar" />
        <div class="search-icon"></div>
      </div>
      `
    this.callback = callback;
  }
 
  addTo($parent) {
    $parent.append(this.template);
      $('.search-bar-wrapper').on('keyup', _.bind(function(e) {
        if (e.keyCode == 13) {
          this.callback($('.input-text-bar')[0].value);
        }
      }, this));
  }
}
