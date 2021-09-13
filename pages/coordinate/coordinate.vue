<template>
	<view class="coordinate">
		<!-- 左右脑协调性测试 -->
		<Navigation :title='"Demo"'></Navigation>
		<view class="play-ready" v-if="showStatus===0">
			<view class="content">
				<view class="tips-title">
					选择与颜色相符的圆形
				</view>
				<view class="tips-content">
					左脑擅长文字识别，右脑疤长更直接的颜色分辨。当两种信意司时出现,左右脑开始运作。
				</view>
				<view class="tips-content" style="color: #CCCCCC;">
					玩法：选择颜色和文字描述相同的选项
				</view>
				<view class="explain">
					<view class="explain-item">
						<view class="circular blue">
							红
						</view>
					</view>
					<view class="explain-item">
						<view class="circular red">
							绿
						</view>
					</view>
					<view class='explain-item'>
						<view class="circular yellow">
							黄
						</view>
					</view>
					<view class="explain-item">
						<view class="circular green">
							蓝
						</view>
					</view>
					<view class="click">
						<view class="iconfont icon-dianji"></view>
					</view>
				</view>
			</view>
			<view class="button">
				<view class="play" @click="changeShowStatus(1)">
					开始游戏
				</view>
				<view class="share">
					分享
				</view>
			</view>
			<view class="ranking-list-button">
				<view class="iconfont icon-huangguan"></view>
				<view class="text">
					排行榜
				</view>
			</view>
		</view>
		<view class="count-down" v-if="showStatus===1">
			{{countownDNumber}}
		</view>
		<view :class="playContentClassNames" v-if="showStatus===2" ref='playContent'>
			<view class="time-content" :style="{paddingTop:docmentNodeValue.statusBar + 'px'}">
				<view class="time">
					{{playEndTime}}s
				</view>
				<view class="number">
					{{selectedList.length}}
				</view>
			</view>
			<view class="color-content">
				<view class="explain-item" v-for="(item,index) in nowColorArr" :key='index'>
					{{item.ifRight}}
					<view class="circular" :style="{backgroundColor:item.color}" @click="selectCircular(item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 计算结果 -->
		<view class="school-report">
			<canvas style="height: 100%;width: 100%;backgroundColor: #ffffff" canvas-id="myCanvas"></canvas>
		</view>
	</view>
</template>

<script>
	import Navigation from '../../components/navigation.vue'
	import danao from '../../static/danao.png'
	export default {
		components: {
			Navigation
		},
		computed: {
			docmentNodeValue() {
				return this.$store.state.docmentNodeValue
			}
		},
		data() {
			return {
				showStatus: 3,
				countownDNumber: 3,
				countownDNumberetInterval: null,
				playEndTime: 30, //游戏结束时间
				playContentClassNames: 'play-content',
				initList: [{
					name: '蓝',
					color: '#1d2089',
					nameUsed: false,
					colorUsed: false
				}, {
					name: '黑',
					color: '#000000',
					nameUsed: false,
					colorUsed: false
				}, {
					name: '紫',
					color: '#920784',
					nameUsed: false,
					colorUsed: false
				}, {
					name: '黄',
					color: '#ffef01',
					nameUsed: false,
					colorUsed: false
				}, {
					name: '绿',
					color: '#009a44',
					nameUsed: false,
					colorUsed: false
				}, {
					name: '红',
					color: '#e70012',
					nameUsed: false,
					colorUsed: false
				}],
				nowColorArr: [],
				myList: [], //暂存
				selectedList: [], //结果
				danao,
			};
		},
		onLoad() {
			setTimeout(() => {
				this.createPlacard()
			}, 300)
		},
		methods: {
			initCanvas() {
				let ctx = uni.createCanvasContext('myCanvas');
				ctx.fillStyle = "#55aaff";
				this.circleImgOne(ctx, danao, uni.upx2px(175), uni.upx2px(95), uni.upx2px(200));
				ctx.draw();
			},
			// 开始制作头像
			createPlacard() {
				uni.getImageInfo({
					src: danao, // 网络图片需先下载，得到临时本地路径，否则绘入 Canvas 可能会出现空白
					success: (img) => {
						const ctx = wx.createCanvasContext('myCanvas', this);
						ctx.fillStyle = "#00aa7f";
						ctx.fillRect(0, 0, uni.upx2px(750), uni.upx2px(1334));


						//画logo
						ctx.save()
						ctx.drawImage(img.path, uni.upx2px(275), uni.upx2px(
							40), uni.upx2px(200), uni.upx2px(200));
						ctx.restore()
						// 在位置 150 创建蓝线
						ctx.save()
						ctx.strokeStyle = "blue";
						ctx.moveTo(uni.upx2px(375), 20);
						ctx.lineTo(uni.upx2px(375), 1070);
						ctx.stroke();
						ctx.restore()
						//画文字
						ctx.font = (uni.upx2px(60) + "px serif");
						ctx.fillStyle = '#FFFFFF'; // 文字填充颜色
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						ctx.fillText("中中中", uni.upx2px(375), uni.upx2px(250));
						//画方框
						ctx.fillStyle = '#ffffff';
						// ctx.fillRect(uni.upx2px((750-650)/2), 200, uni.upx2px(650), 100);
						this.circleImgTwo(ctx, uni.upx2px((750 - 600) / 2), uni.upx2px(320), uni.upx2px(600),
							uni.upx2px(600), uni.upx2px(20), uni.upx2px(10));
						this.circleImgTwo(ctx, uni.upx2px((750 - 600) / 2), uni.upx2px(924), uni.upx2px(600),
							uni.upx2px(300), uni.upx2px(20), uni.upx2px(10));
						//画两个小圆形作为两个边框的缺口
						ctx.save()
						ctx.beginPath();
						// ctx.moveTo(10,uni.upx2px(924))
						ctx.arc(uni.upx2px(74), uni.upx2px(922), uni.upx2px(20), 0, 2 * Math.PI);
						ctx.moveTo(uni.upx2px(670), uni.upx2px(924));
						ctx.arc(uni.upx2px(674), uni.upx2px(922), uni.upx2px(20), 0, 2 * Math.PI);
						ctx.fillStyle = '#00aa7f'; // 设置绘制圆形边框的颜色
						ctx.fill();
						ctx.restore();
						//画头像
						ctx.beginPath();
						this.circleImgOne(ctx, img.path, uni.upx2px(114), uni.upx2px(360), uni.upx2px(50))
						//画昵称
						ctx.save();
						ctx.font = (uni.upx2px(36) + "px serif");
						ctx.fillStyle = '#000000'; // 文字填充颜色
						ctx.textAlign = "left";
						ctx.textBaseline = "middle";
						ctx.fillText("中中中", uni.upx2px(220), uni.upx2px(410));
						ctx.restore();
						//画大括号
						this.braces(ctx,uni.upx2px(40),uni.upx2px(40))
						ctx.draw();
					}
				})
			},
			braces(ctx, x, y){
				ctx.save()
				ctx.beginPath();
				ctx.lineTo(x, y);
				ctx.lineTo(x+10, y);
				ctx.restore();
			},
			/*
			 *  参数说明
			 *  ctx Canvas实例
			 *  img 图片地址
			 *   x  x轴坐标
			 *   y  y轴坐标
			 *   r  圆形半径
			 */
			circleImgOne(ctx, img, x, y, r) {
				// 如果在绘制图片之后还有需要绘制别的元素，需启动 save() 、restore() 方法，否则 clip() 方法会导致之后元素都不可见
				//    save()：保存当前 Canvas 画布状态
				// restore()：恢复到保存时的状态
				ctx.save();
				let d = r * 2;
				let cx = x + r;
				let cy = y + r;
				ctx.arc(cx, cy, r, 0, 2 * Math.PI);
				ctx.strokeStyle = '#FFFFFF'; // 设置绘制圆形边框的颜色
				ctx.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
				ctx.clip();
				ctx.drawImage(img, x, y, d, d);
				ctx.restore();
			},
			circleImgTwo(ctx, x, y, w, h, r) {
				// 画一个图形
				ctx.save();
				if (w < 2 * r) r = w / 2;
				if (h < 2 * r) r = h / 2;
				ctx.beginPath();
				ctx.moveTo(x + r, y);
				ctx.arcTo(x + w, y, x + w, y + h, r);
				ctx.arcTo(x + w, y + h, x, y + h, r);
				ctx.arcTo(x, y + h, x, y, r);
				ctx.arcTo(x, y, x + w, y, r);
				ctx.closePath();
				ctx.strokeStyle = '#FFFFFF'; // 设置绘制圆形边框的颜色
				ctx.stroke();
				ctx.clip();
				ctx.fillStyle = "#ffffff"; //设置填充颜色
				ctx.fill(); //开始填充
				ctx.restore();
			},
			selectCircular(item) {
				//如果答案正确
				if (item.ifRight) {
					this.selectedList.push({
						endTime: (new Date()).getTime(),
						...item
					})
				} else {
					this.playContentClassNames = 'play-content error'
					setTimeout(() => {
						this.playContentClassNames = 'play-content'
					}, 500)
				}
				this.initNowColorList()
			},
			playEndTimeFunc() {
				this.playEndTimeInterval = setInterval(() => {
					this.playEndTime--
					if (this.playEndTime <= 0) {
						//game over
						this.showStatus = 3
					}
					clearInterval(this.playEndTimeInterval)
				}, 1000)
			},
			changeShowStatus(e) {
				this.showStatus = e
				if (e === 1) {
					this.startCountownDNumber()
				}
			},
			startCountownDNumber() {
				this.countownDNumber = 1
				this.countownDNumberetInterval = setInterval(() => {
					this.countownDNumber--
					if (this.countownDNumber <= 0) {
						//倒计时结束，开始游戏
						this.changeShowStatus(2)
						this.initNowColorList()
						this.playEndTimeFunc()
						clearInterval(this.countownDNumberetInterval)
					}
				}, 1000)
			},
			initNowColorList() {
				//初始化当前的颜色测试单元
				//**从列表随机取一个正确的
				let index = Math.floor(Math.random() * 6)
				this.myList = JSON.parse(JSON.stringify(this.initList))
				let trueColor = {
					...this.myList[index],
					ifRight: true,
					nameUsed: true,
					colorUsed: true,
					startTime: (new Date()).getTime()
				}
				//标记此对象name和color已被使用
				this.myList[index].nameUsed = true
				this.myList[index].colorUsed = true
				//**随机取三个错误的
				let errColor = []
				for (let i = 0; i < 3; i++) {
					errColor.push({
						id: 0,
						ifRight: false,
						nameUsed: false,
						colorUsed: false
					})
				}
				//组合成一个当前测试的数组
				this.nowColorArr = [trueColor, ...errColor]
				const that = this
				for (let i = 0; i < that.nowColorArr.length; i++) {
					if (that.nowColorArr[i].ifRight != true) {
						that.errorColor('name', null, i, (resNameObj, nameIndex) => {
							that.nowColorArr[nameIndex].name = resNameObj.name
							that.errorColor('color', resNameObj, nameIndex, (resColorObj, colorIndex) => {
								that.nowColorArr[colorIndex].color = resColorObj.color
							});
						});
					}
				}
				//打乱排序
				that.nowColorArr = that.randSort(that.nowColorArr)
			},
			errorColor(type, oldObj = {}, errorIndex, cb) {
				this.myList = this.randSort(this.myList)
				let obj = this.myList.find((item, index) => {
					if (item[`${type}Used`] === false) {
						if (oldObj) {
							if (oldObj.nameUsed && item.name === oldObj.name) {
								return false
							} else {
								this.myList[index][`${type}Used`] = true
								return true
							}
						} else {
							this.myList[index][`${type}Used`] = true
							return true
						}
					} else {
						return false
					}
				})
				if (obj) {
					cb(obj, errorIndex)
				} else {
					cb(null, errorIndex)
				}
			},
			randSort(arr) {
				for (var i = 0, len = arr.length; i < len; i++) {
					var rand = parseInt(Math.random() * len);
					var temp = arr[rand];
					arr[rand] = arr[i];
					arr[i] = temp;
				}
				return arr;
			}
		}
	}
</script>

<style scoped lang="scss">
	.school-report {
		width: 100vw;
		height: 100vh;
	}

	.play-content {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		&.error {
			box-shadow: 0 -60upx 80upx 40upx rgba(231, 0, 18, 0.37) inset;
		}

		.color-content {
			width: 600upx;
			height: 600upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;

			.explain-item {
				width: 50%;
				height: 50%;
				display: flex;
				justify-content: center;
				text-align: center;
				line-height: 100%;


				.circular {
					width: 200upx;
					height: 200upx;
					border-radius: 100%;
					line-height: 200upx;
					text-align: center;
					text-shadow: 0 0 6upx #333333;
					font-weight: 700;
					font-size: 60upx;
					color: #FFFFFF;
				}

			}
		}

		.time-content {
			width: 100vw;
			height: 160upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: absolute;
			top: 180upx;
			box-sizing: border-box;

			.number {
				font-weight: 600;
				font-size: 50upx;
				color: #77ff7c;
			}
		}
	}

	.count-down {
		color: #FFFFFF;
		line-height: 100%;
		font-size: 80upx;
	}

	.play-ready,
	.count-down {
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(to top, #4ccbf1, #6bb5ff);
		padding: 48upx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.circular {
			background-color: green;
			width: 120upx;
			height: 120upx;
			border-radius: 120upx;
			text-align: center;
			line-height: 120upx;
			color: #FFFFFF;
			font-weight: 600;
			text-shadow: 0upx 4upx 6upx #333333;

			&.blue {
				background-color: #00aaff;
			}

			&.red {
				background-color: #ff5555;
			}

			&.yellow {
				background-color: #e3e300;
			}

			&.green {
				background-color: #55ff7f;
			}
		}

		.content {
			background-color: #FFFFFF;
			width: 100%;
			min-height: 300upx;
			border-radius: 12upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding: 24upx;
			box-sizing: border-box;

			.tips-title {
				font-weight: 600;
				font-size: 32upx;
				margin-bottom: 24upx;
			}

			.tips-content {
				font-size: 28upx;
				margin-bottom: 24upx;
				color: #333333;
			}

			.explain {
				width: 300upx;
				height: 300upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-direction: column;
				flex-wrap: wrap;
				margin: 120upx 0;
				position: relative;

				.explain-item {
					width: 50%;
					height: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

				}

				.click {
					position: absolute;
					right: 20upx;
					top: 80upx;

					.iconfont {
						font-size: 100upx;
						color: #000000;

					}
				}
			}

		}

		.button {
			width: 100vw;
			display: flex;
			justify-content: center;
			padding: 48upx 0;

			.play {
				width: 240upx;
				height: 80upx;
				line-height: 80upx;
				background-color: rgb(255, 194, 48);
				color: #FFFFFF;
				text-align: center;
				border-radius: 12upx;
				margin-right: 48upx;
			}

			.share {
				width: 180upx;
				height: 80upx;
				line-height: 80upx;
				background-color: rgb(0, 170, 0);
				color: #FFFFFF;
				text-align: center;
				border-radius: 12upx;
			}
		}

		.ranking-list-button {
			height: 60upx;
			line-height: 60upx;
			display: flex;
			justify-content: center;

			.iconfont {
				color: #FFFFFF;
				margin: 0 12upx;
			}

			.text {
				color: #FFFFFF;
			}
		}
	}
</style>
