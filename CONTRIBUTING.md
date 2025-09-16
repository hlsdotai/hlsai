# Contributing to HLS.ai

Thank you for your interest in contributing to **HLS.ai**!  
We welcome community input, bug reports, feature requests, and code contributions.

---

## 🛠 Code of Conduct
Please be respectful and constructive in all discussions.  
We aim to foster a professional, collaborative environment.

---

## 🧑‍💻 How to Contribute

### 1. Fork & Branch
- Fork the repository on GitHub
- Create a feature branch:
  ```bash
  git checkout -b feature/your-feature
  ```

### 2. Make Your Changes
- Follow the coding style of the existing project
- Add comments for clarity
- Keep commits small and descriptive

### 3. Test
- Ensure that the project builds:
  ```bash
  mkdir build && cd build
  cmake ..
  make
  ```
- Run the demo (`openh264_demo`) and confirm `out.ts` plays in VLC

### 4. Submit a Pull Request
- Push your branch:
  ```bash
  git push origin feature/your-feature
  ```
- Open a Pull Request on GitHub
- Clearly describe your changes and link to any related issues

---

## 📋 Contribution Areas
- **Encoder**: video demuxing, OpenH264 integration, TS muxer improvements, zone-aware frame dropping
- **Player**: canvas rendering, adaptive zone handling, multiple stream support
- **Docs**: improve README, write tutorials, clarify licensing
- **Tests**: add sample videos, CI builds, automated playback verification

---

## 📜 License
Contributions are accepted under the same license as the project:  
- Free for **personal and non-commercial use**  
- Commercial use requires a license agreement with ReceiptRoller Inc.  

By contributing, you agree that your work may be incorporated into HLS.ai under these terms.
