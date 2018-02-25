class Task {
  constructor(opt) {
    if (opt.source_c && typeof opt.source_c == "string") {
      this.source_c = opt.source_c
    } else {
      throw new Error("Invalid source collection");
    }

    if (opt.destination_c && typeof opt.destination_c == "object" ) {
      this.destination_c = opt.destination_c || []
    } else {
      throw new Error("Invalid destination collection");
    }

    if (opt.source_f && typeof opt.source_f == "string" ) {
      this.source_f = opt.source_f;
    } else {
      throw new Error("Invalid source field");
    }

    if (opt.destination_f && typeof opt.destination_f == "string" ) {
      this.destination_f = opt.destination_f;
    } else {
      throw new Error("Invalid destination field");
    }

    if (opt.fields && typeof opt.fields == "object" ) {
      this.fields = opt.fields;
    } else {
      throw new Error("Invalid fields");
    }

  }
}

module.exports = Task;
